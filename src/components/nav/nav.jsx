import React, { Fragment, useContext } from "react";
import { NavContainer, Ul, Li, NavLink } from "./styled";
import { Link } from "react-router-dom";
import { AuthContext } from "../Auth/index";
export const AuthNav = () => {
  const { onLogout, isAuth } = useContext(AuthContext);

  // ReNDER
  return (
    <Fragment>
      <NavContainer>
        <h1>Game</h1>
        <Ul>
          <Li>
            <NavLink to="/Game">Game</NavLink>
          </Li>
          <Li>
            <NavLink to="/Score">Score</NavLink>
          </Li>
          {isAuth ? (
            ""
          ) : (
            <Li>
              <NavLink to="/SignUp">Sign up</NavLink>
            </Li>
          )}
          {isAuth ? (
            ""
          ) : (
            <Li>
              <NavLink to="/">Sign in</NavLink>
            </Li>
          )}
          <Li>
            <NavLink to="/" onClick={onLogout}>
              Sign out
            </NavLink>
          </Li>
        </Ul>
      </NavContainer>
    </Fragment>
  );
};
