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
} from "./styled";
import { AuthContext } from "../../components/Auth/index";

export const ForgotPassword = () => {
  const [authData, setAuthData] = useState([""]);
  const [background_email, setBackEmail] = useState(false);
  const {
    isAuth,
    onLoginIn,
    _error,
    isEmailVerified,
    loading,
    onResetPassword,
  } = useContext(AuthContext);
  const [errors, setErrors] = useState({
    errorNotFoud: false,
    errorInvalid: false,
  });
  const _onBlur = ({ target: { value } }) => {
    if (value) {
      setBackEmail(true);
    } else if (!value) {
      setBackEmail(false);
      setErrors({ errorEmailInUse: false, errorInvalid: false });
    }
  };
  useEffect(() => {
    if (_error) {
      let { code } = _error;
      if (code === "auth/user-not-found") {
        setErrors({ errorNotFoud: true });
      } else if (code === "auth/invalid-email") {
        setErrors({ errorInvalid: true });
      }
    }
  }, [_error]);
  const onChange = (i) => (e) => {
    const _authData = [...authData];
    _authData[i] = e.target.value;
    setAuthData(_authData);
  };

  const submitClick = (e) => {
    e.preventDefault();
    onResetPassword(...authData);
  };
  return (
    <>
      <ContainerForm>
        <WrapperSignIn>
          <Form>
            <Header_CheckIn>RESET PASSWORD</Header_CheckIn>
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
                    : "Enter your email"}
                </Span>
              </Span>
            </Label>
            <SubmitSignUp onClick={submitClick}>Reset password</SubmitSignUp>
          </Form>
        </WrapperSignIn>
      </ContainerForm>
    </>
  );
};
