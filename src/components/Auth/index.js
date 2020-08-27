import React, { useState, useEffect } from "react";
import * as firebase from "firebase";

export const AuthContext = React.createContext();

export const AuthLayout = ({ children }) => {
  const [isAuth, setAuth] = useState(false);
  const [_error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isResetPassword, setIsResetPassword] = useState("");
  const [_actionCode, setActionCode] = useState("");
  const [mode, setMode] = useState("");
  const [users, setUsers] = useState({
    email: "",
    displayName: "",
    password: "",
    timestamp: new Date().toLocaleString(),
    score: "",
  });
  let auth = firebase.auth();
  let defaultDatabase = firebase.database();

  const onLoginUp = async (email, password, displayName) => {
    try {
      await auth.createUserWithEmailAndPassword(email, password);

      await auth.currentUser.sendEmailVerification().then(() => {
        console.log("email sent");
      });

      await auth.currentUser.updateProfile({
        displayName: displayName,
      });
    } catch (error) {
      if (error) {
        setError(error);
        console.log(error);
        return;
      }
    }
  };

  const onLoginIn = async (email, password) => {
    try {
      auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
      await auth.signInWithEmailAndPassword(email, password);
      if (auth.currentUser.emailVerified) {
        setAuth(!!auth.currentUser);
      }
    } catch (error) {
      if (error) {
        setError(error);
        console.log(error);
      }
    }
  };
  const onResetPassword = async (email) => {
    try {
      await auth.sendPasswordResetEmail(email).then(() => {
        setIsResetPassword(true);
        console.log("email sent for reset password");
      });
    } catch (error) {
      setError(error);
      console.log(error);
    }
  };
  const onLogout = () => {
    auth.signOut();
    setAuth(false);
  };

  const handleVerifyEmail = async (auth, actionCode) => {
    try {
      await auth.applyActionCode(actionCode).then(() => {
        auth.onAuthStateChanged((user) => {
          if (user) {
            defaultDatabase.ref("users/" + user.uid).set({
              ...users,
              email: user.email,
              displayName: user.displayName,
            });
            setAuth(!!auth.currentUser);
          }
        });
      });
    } catch (error) {
      if (error) {
        console.log(error);
      }
    }
  };
  const handleResetPassword = async (auth, actionCode, newPassword) => {
    let accountEmail = null;
    let _newPassword = newPassword;

    try {
      await auth.verifyPasswordResetCode(actionCode).then((email) => {
        accountEmail = email;
      });
      await auth
        .confirmPasswordReset(actionCode, _newPassword)
        .then((resp) => {});
      await auth.signInWithEmailAndPassword(accountEmail, _newPassword);
      if (auth.currentUser.emailVerified) {
        setAuth(!!auth.currentUser);
        setMode("");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    let isMouth = true;
    let params = new URL(document.location).searchParams;
    let actionCode = params.get("oobCode");
    let mode = params.get("mode");
    let LoadTimer = null;
    if (mode == "verifyEmail") {
      handleVerifyEmail(auth, actionCode);
    } else if (mode == "resetPassword") {
      setMode(mode);
      setActionCode(actionCode);
    }

    auth.onAuthStateChanged((user) => {
      if (user) {
        if (user.emailVerified) {
          LoadTimer = setTimeout(() => {
            setLoading(false);
            isMouth && setAuth(!!auth.currentUser);
          }, 1000);
        }
      } else {
        setLoading(false);
      }
    });
    return () => {
      isMouth = false;
      clearTimeout(LoadTimer);
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        users,
        isResetPassword,
        _actionCode,
        mode,
        users,
        loading,
        _error,
        isAuth,
        onLoginIn,
        onLoginUp,
        onLogout,
        onResetPassword,
        handleResetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const AuthConsumer = AuthContext.Consumer;
