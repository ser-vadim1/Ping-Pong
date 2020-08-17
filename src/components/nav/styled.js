import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";
export const NavContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 10vh;
  color: white;
  background-color: black;
`;
export const Ul = styled.ul`
  min-width: 500px;
  list-style: none;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: white;
`;
export const Li = styled.li`
  font-size: 18px;
  color: white;
`;

export const NavLink = styled(Link)`
  color: #f5af0c;
  text-decoration: none;
  &:after {
    background-color: white;
    display: block;
    content: "";
    height: 2px;
    width: 0%;
    -webkit-transition: width 0.3s ease-in-out;
    -moz--transition: width 0.3s ease-in-out;
    transition: width 0.3s ease-in-out;
  }
  &:hover:after {
    width: 100%;
  }
`;
