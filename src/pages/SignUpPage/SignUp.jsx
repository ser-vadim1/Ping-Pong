import React, { useState, Fragment, useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation,
} from "react-router-dom";
import {
  ContainerForm,
  WrapperSignIn,
  Form,
  Header_CheckIn,
  Input,
  SubmitSignUp,
  Label,
  Span,
} from "./styledSignUp";
import { AuthConsumer } from "../../components/Auth/index";
import { AuthContext } from "../../components/Auth/index";

export const SignUp = (props) => {
  let histoty = useHistory();
  const [errors, setErrors] = useState({
    errorWeakPass: false,
    errorEmailInUse: false,
    errorInvalid: false,
  });
  const [authData, setAuthData] = useState(["", "", ""]);
  const { _error } = useContext(AuthContext);
  const [background_email, setBackEmail] = useState(false);
  const [background_pass, setBackpass] = useState(false);
  const [backround_text, setBackText] = useState(false);

  const _onBlur = ({ target: { value, type } }) => {
    if (value && type === "email") {
      setBackEmail(true);
    }
    if (value && type == "text") {
      setBackText(true);
    }
    if (value && type === "password") {
      setBackpass(true);
    } else if (!value && type === "password") {
      setBackpass(false);
      setErrors({ errorWeakPass: false });
    } else if (!value && type === "email") {
      setBackEmail(false);
      setErrors({ errorEmailInUse: false, errorInvalid: false });
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
      if (code === "auth/email-already-in-use") {
        setErrors({ errorEmailInUse: true });
      } else if (code === "auth/invalid-email") {
        setErrors({ errorInvalid: true });
      } else if (code === "auth/weak-password") {
        setErrors({ errorWeakPass: true });
      }
    }
  }, [_error]);

  useEffect(() => {
    setErrors({ ...errors });
  }, []);
  return (
    <AuthConsumer>
      {({ isAuth, onLoginUp }) => {
        if (isAuth) {
          return <Redirect to="/Game" />;
        }
        return (
          <Fragment>
            <ContainerForm>
              <WrapperSignIn>
                <Form>
                  <Header_CheckIn>SIGN UP</Header_CheckIn>
                  <Label>
                    <Input
                      value={authData[2]}
                      onChange={onChange(2)}
                      type="text"
                      onBlur={_onBlur}
                      background={backround_text}
                      error={errors.errorWeakPass}
                    ></Input>
                    <Span>
                      <Span>Nick name</Span>
                    </Span>
                  </Label>
                  <Label>
                    <Input
                      value={authData[0]}
                      onChange={onChange(0)}
                      type="email"
                      onBlur={_onBlur}
                      background={background_email}
                      error={errors.errorEmailInUse || errors.errorInvalid}
                    ></Input>
                    <Span>
                      <Span>
                        {" "}
                        {errors.errorEmailInUse
                          ? "Email had already existed"
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
                      error={errors.errorWeakPass}
                    ></Input>
                    <Span>
                      <Span>
                        {errors.errorWeakPass ? "Weak password" : "Password"}
                      </Span>
                    </Span>
                  </Label>
                  <SubmitSignUp
                    onClick={(e) => {
                      e.preventDefault();
                      onLoginUp(...authData);
                    }}
                  >
                    SIGN UP
                  </SubmitSignUp>
                </Form>
              </WrapperSignIn>
            </ContainerForm>
          </Fragment>
        );
      }}
    </AuthConsumer>
  );
};
