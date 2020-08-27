import React, { useState, useEffect, useContext } from "react";
import {
  ContainerForm,
  WrapperSignIn,
  Form,
  Header_CheckIn,
  Input,
  SubmitSignUp,
  Label,
  Span,
  P,
  StyledLink,
  Wrapper_P,
} from "./styledSignIn";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../../components/Auth/index";
import { Preloader } from "../../components/preloader/Preloader";

export const SignIn = (props) => {
  const [errors, setErrors] = useState({
    errorPassword: false,
    errorNotFoud: false,
    errorInvalid: false,
  });

  const [authData, setAuthData] = useState(["", ""]);
  const { isAuth, onLoginIn, _error, loading, mode } = useContext(AuthContext);
  const [background_email, setBackEmail] = useState(false);
  const [background_pass, setBackpass] = useState(false);

  const _onBlur = ({ target: { value, type } }) => {
    if (value && type === "email") {
      setBackEmail(true);
    }
    if (value && type === "password") {
      setBackpass(true);
    } else if (!value && type === "password") {
      setBackpass(false);
    } else if (!value && type === "email") {
      setBackEmail(false);
    }
  };
  const onChange = (i) => (e) => {
    const _authData = [...authData];
    _authData[i] = e.target.value;
    setAuthData(_authData);
  };
  useEffect(() => {
    if (_error) {
      let { code } = _error;
      if (code === "auth/wrong-password") {
        setErrors({ errorPassword: true });
      } else if (code === "auth/user-not-found") {
        setErrors({ errorNotFoud: true });
      } else if (code === "auth/invalid-email") {
        setErrors({ errorInvalid: true });
      }
    }
  }, [_error]);
  useEffect(() => {
    setErrors({ ...errors });
  }, []);

  const submitClick = (e) => {
    e.preventDefault();
    onLoginIn(...authData);
  };

  if (isAuth) {
    return <Redirect to="/Game" />;
  } else if (loading) {
    return (
      <>
        <Preloader />
      </>
    );
  } else if (mode == "resetPassword") {
    return <Redirect to="/ResetPassword" />;
  }
  return (
    <>
      <h4>ser.vadim1@gmail.com</h4>
      <h4>inspired_by_the_idea@outlook.com</h4>
      <ContainerForm>
        <WrapperSignIn>
          <Form>
            <Header_CheckIn>SIGN IN</Header_CheckIn>
            <Label>
              <Input
                value={authData[0]}
                onChange={onChange(0)}
                type="email"
                onBlur={_onBlur}
                background={background_email}
                error={errors.errorNotFoud || errors.errorInvalid}
              ></Input>
              <Span>
                <Span>
                  {errors.errorNotFoud
                    ? "user not found"
                    : errors.errorInvalid
                    ? "invalid email"
                    : "Email"}
                </Span>
              </Span>
            </Label>
            <Label>
              <Input
                value={authData[1]}
                onChange={onChange(1)}
                type="password"
                onBlur={_onBlur}
                background={background_pass}
                error={errors.errorPassword}
              ></Input>
              <Span>
                <Span>
                  {errors.errorPassword ? "wrong Password" : "Password"}
                </Span>
              </Span>
            </Label>
            <Wrapper_P>
              <P>
                If you don't have an account you may create one
                <StyledLink to="/SignUp"> HERE </StyledLink>
              </P>
              <P>
                <StyledLink to="/ResetPassword">Forget password ?</StyledLink>
              </P>
            </Wrapper_P>
            <SubmitSignUp onClick={submitClick}>SIGN IN</SubmitSignUp>
          </Form>
        </WrapperSignIn>
      </ContainerForm>
    </>
  );
};
