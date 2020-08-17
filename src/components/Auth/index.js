import React, { useState, useEffect } from "react";
import * as firebase from "firebase";

export const AuthContext = React.createContext();

export const AuthLayout = ({ children }) => {
  const [isAuth, setAuth] = useState(false);
  const [_error, setError] = useState(null);
  const [isEmailVerified, setIsVerified] = useState(false);

  const onLoginUp = async (email, password, NickName) => {
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      await firebase.auth().currentUser.sendEmailVerification();
      await firebase.auth().currentUser.updateProfile({
        displayName: NickName,
      });
    } catch (error) {
      if (error) {
        setError(error);
        return;
      }
    }
  };

  const onLoginIn = async (email, password) => {
    try {
      await firebase
        .auth()
        .setPersistence(firebase.auth.Auth.Persistence.LOCAL);
      await firebase.auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      if (error) {
        setError(error);
        return;
      }
    }

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        if (user.emailVerified) {
          setAuth(!!firebase.auth().currentUser);
          console.log(user);
        } else {
          setIsVerified(true);
        }
      }
    });
  };

  const onLogout = () => {
    firebase.auth().signOut();
    setAuth(false);
  };

  useEffect(() => {
    let isMouth = true;
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        if (user.emailVerified) {
          isMouth && setAuth(!!firebase.auth().currentUser);
        }
      }
    });
    return () => {
      isMouth = false;
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isEmailVerified,
        _error,
        isAuth,
        onLoginIn,
        onLoginUp,
        onLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const AuthConsumer = AuthContext.Consumer;
