import React, { useContext } from "react";
import {
  NavWrapper,
  NavContainer,
  Ul,
  Li,
  NavLink,
  Wrapperphoto,
  IMG,
} from "./styled";
import { AuthContext } from "../Auth/index";
export const AuthNav = () => {
  const { onLogout, isAuth } = useContext(AuthContext);

  // ReNDER
  return (
    <>
      <NavContainer>
        <NavWrapper>
          <Wrapperphoto>
            <NavLink to="/Game">
              <IMG src="https://cdn4.iconfinder.com/data/icons/sports-games-and-fitness-vol-7/520/sports_sport_games_fitness_play_game_-_33-512.png" />
            </NavLink>
          </Wrapperphoto>
          <Ul _width={isAuth}>
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
        </NavWrapper>
      </NavContainer>
    </>
  );
};
