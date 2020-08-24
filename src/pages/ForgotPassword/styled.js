import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";

export const ContainerForm = styled.div`
  background-color: rgba(48, 47, 47);
  border-radius: 5px;
  min-width: 500px;
  position: fixed;
  margin-top: 30px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;
export const WrapperSignIn = styled.div`
  padding: 20px;
`;
export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
export const Header_CheckIn = styled.span`
  letter-spacing: 5px;
  color: white;
  margin: 0 auto;
  font-size: 24px;
`;

export const SubmitSignUp = styled.button`
  cursor: pointer;
  padding: 20px;
  border-radius: 5px;
  margin-top: 20px;
  background-color: rgba(245, 175, 12);
  width: 100%;
  border: none;
`;
export const Label = styled.label`
  width: 460px;
  height: 42px;
  margin: 40px 0 0 0;
  position: relative;
`;

export const Span = styled.span`
  width: 100%;
  position: absolute;
  left: 0;
  top: 0px;
  bottom: 0px;

  cursor: text;
  /* border: 4px solid red; */
  cursor: text;
  & > & {
    position: absolute;
    top: 0px;
    bottom: 0px;
    font-size: 16px;
    color: #fff;
    transition: 0.3s;
    -webkit-transition: 0.3s;
    -moz-transition: 0.3s;
  }
  &:before {
    content: "";
    width: 0%;
    height: 3px;
    background-color: white;
    position: absolute;
    bottom: -3px;
    left: 0;
    z-index: 99;
    transition: 0.3s;
    -webkit-transition: 0.3s;
    -moz-transition: 0.3s;
  }
  &:after {
    content: "";
    width: 0%;
    height: 3px;
    background-color: white;
    position: absolute;
    bottom: -3px;
    right: 0px;
    z-index: 99;
    transition: 0.3s;
    -webkit-transition: 0.3s;
    -moz-transition: 0.3s;
  }
`;
export const Input = styled.input`
  width: 99.3%;
  height: 40px;
  border: none;
  outline: none;
  background-color: ${({ background }) =>
    background ? "rgba(48, 47, 47)" : "transparent"};
  border-bottom: ${({ error }) =>
    error ? "3px solid red" : "3px solid #f5af0c"};
  color: #fff;
  font-size: 16px;
  position: relative;
  z-index: 99;
  &:focus + ${Span} > ${Span} {
    cursor: initial;
    position: absolute;
    top: -25px;
    color: #f5af0c;
    &:before {
      width: 50%;
    }
    &:after {
      width: 50%;
    }
  }
`;

export const P = styled.p``;

export const Wrapper_P = styled.div`
  color: white;
  padding-top: 10px;
  font-size: 14px;
  & > P + P + P {
    padding-top: 0px;
    margin-top: --5px;
    display: inline-block;
    border-bottom: 2px solid red;
  }
`;
export const StyledLink = styled(Link)`
  color: #f5af0c;
  text-decoration: none;
`;
