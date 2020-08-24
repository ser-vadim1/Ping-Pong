import React, { useState, useEffect } from "react";
import * as firebase from "firebase";
import { useReducer } from "react";

export const AuthContext = React.createContext();

export const AuthLayout = ({ children }) => {
  const [isAuth, setAuth] = useState(false);
  const [_error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState({
    email: "",
    displayName: "",
    password: "",
    timestamp: new Date().toLocaleString(),
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
      await auth.sendPasswordResetEmail(email);
      console.log("email sent");
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
            defaultDatabase
              .ref("users/" + user.uid)
              .set({ ...users, email: user.email });
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
  useEffect(() => {
    let isMouth = true;
    let params = new URL(document.location).searchParams;
    let actionCode = params.get("oobCode");
    let mode = params.get("mode");
    let LoadTimer = null;
    if (mode == "verifyEmail") handleVerifyEmail(auth, actionCode);

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
        loading,
        _error,
        isAuth,
        onLoginIn,
        onLoginUp,
        onLogout,
        onResetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const AuthConsumer = AuthContext.Consumer;
