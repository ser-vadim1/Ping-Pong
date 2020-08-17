import React, { useContext } from "react";
import { AuthContext } from "./index";
import { Redirect } from "react-router-dom";
import { AuthNav } from "../nav/nav";

export const AuthPageLayout = ({ children }) => {
  const { isAuth } = useContext(AuthContext);

  if (isAuth) {
    return (
      <>
        {/* <AuthNav onLogout={onLogout} /> */}
        {children}
      </>
    );
  }
  return <Redirect to="/" />;
};
