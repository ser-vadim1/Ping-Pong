import React from "react";
import { AuthConsumer } from "./index";
import { Redirect } from "react-router-dom";
import { AuthHeader } from "../Header";

export const AuthPageLayout = ({ children }) => {
  return (
    <AuthConsumer>
      {({ isAuth, onLogout }) => {
        if (isAuth)
          return (
            <>
              <AuthHeader onLogout={onLogout} />
              {children}
            </>
          );
        return <Redirect to="/" />;
      }}
    </AuthConsumer>
  );
};
