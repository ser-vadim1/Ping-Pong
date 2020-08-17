import React, { useContext } from "react";
import { HomePage } from "../../pages/HomePage/Game";
import { SignIn } from "../../pages/SignInPage/signIn.jsx";
import { SignUp } from "../../pages/SignUpPage/SignUp.jsx";
import { Score } from "../../pages/Score/Score";

import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { AuthLayout } from "../Auth/index";
import { AuthNav } from "../nav/nav";
import { AuthContext } from "../Auth/index";

export const _Router = () => {
  const { isAuth } = useContext(AuthContext);
  return (
    <BrowserRouter>
      <AuthNav />
      <Switch>
        <Route path="/Game">
          {isAuth ? <HomePage /> : <Redirect to="/" />}
        </Route>
        <Route path="/SignUp">
          <SignUp />
        </Route>
        <Route exact path="/">
          <SignIn />
        </Route>
        <Route path="/Score">{isAuth ? <Score /> : <Redirect to="/" />}</Route>
      </Switch>
    </BrowserRouter>
  );
};