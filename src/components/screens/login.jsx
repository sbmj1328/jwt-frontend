import React, { useState, useEffect } from "react";
import {
  InputAdornment,
  FormControl,
  Box,
  InputLabel,
  OutlinedInput,
  TextField,
  CircularProgress,
  Button,
  IconButton,
  Typography,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import styled from "styled-components";
import JWT_IMG from "../../assets/jwt.png";
import { LoginValidation } from "../utils/validation";
import { useSelector, useDispatch } from "react-redux";
import { loginAction } from "../../dataStore/redux/action/login-action";

const LoginContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const LeftContainer = styled.div`
  width: 40%;
  height: 100%;
  background-color: #061840;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const Img = styled.img`
  width: 250px;
  height: 100px;
`;

const LoginText = styled.p`
  font-size: 42px;
  color: #061840;
  margin-right: 20%;
  text-align: left;
  padding: 20px 0;
`;

const RightContainer = styled.div`
  width: 60%;
  height: 100%;
  background-color: #eef2f7;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const FormCtrl = styled(FormControl)`
  && {
    width: 100%;
    margin-top: 24px;
  }
`;

const LoginBtn = styled(Button)`
  && {
    background-color: #061840;
    opacity: 1;
    padding: 10px 16px;
  }
`;
const RegisterDiv = styled.div`
  margin-top: 10px;
`;

const LoginBox = styled(Box)`
  && {
    max-width: 500px;
  }
`;

// Login Component
export default function Login() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { loginReducer } = useSelector((state) => state);
  const [state, setState] = useState({
    email: "",
    password: "",
    showPassword: false,
  });
  const [errors, setError] = useState({});
  const [isSubmitting, setSubmiting] = useState(false);

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      submitLogin();
    }
  }, [errors]);

  const submitLogin = () => {
    setError({});
    dispatch(loginAction(state), () => {
      history.push("/home");
      setSubmiting(false);
    });
  };

  const loginValidate = () => {
    setError(LoginValidation(state));
    setSubmiting(true);
  };

  const handleChange = (e, name) => {
    const { value } = e.target;
    console.log("my logs ", name, value);
    setState({
      ...state,
      [name]: value,
    });
  };

  const handlePassVisible = (name) => {
    setState({
      ...state,
      showPassword: !state.showPassword,
    });
  };

  return (
    <LoginContainer>
      <LeftContainer>
        <Img src={JWT_IMG} />
      </LeftContainer>
      <RightContainer>
        <LoginBox
          className="auth_box"
          bgcolor="white"
          boxShadow="2"
          borderRadius="12px"
          textAlign="center"
          p="24px"
          mt="50px"
        >
          <LoginText>Log into your Account</LoginText>
          <FormCtrl variant="outlined" className="textfield_custom_auth">
            <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
            <OutlinedInput
              id="outlined-adornment-email"
              type={"text"}
              value={state.email}
              onChange={(e) => handleChange(e, "email")}
              labelWidth={40}
            />
            <p className="auth_helper_text">{errors?.email} </p>
          </FormCtrl>

          <FormCtrl variant="outlined" className="textfield_custom_auth">
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={state.showPassword ? "text" : "password"}
              value={state.password}
              onChange={(e) => handleChange(e, "password")}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handlePassVisible}
                    edge="end"
                  >
                    {state.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={70}
            />
            <p className="auth_helper_text">{errors?.password} </p>
          </FormCtrl>
          <br />
          <br />
          {loginReducer.isLoading ? (
            <CircularProgress
              color="#061840"
              className="auth_loader"
              size={24}
              thickness={4}
              color="primary"
            />
          ) : (
            <></>
          )}
          <br />
          <LoginBtn
            disabled={loginReducer.isLoading}
            className="auth_login_btn auth_button"
            disableElevation
            variant="contained"
            color="primary"
            fullWidth
            onClick={loginValidate}
          >
            Login
          </LoginBtn>
          <RegisterDiv className="auth_login_forgot_password_container">
            <Typography>
              <span>Dont have account? </span>
              <span
                style={{ color: "#061840", cursor: "pointer" }}
                onClick={() => {
                  history.push("/auth/register");
                }}
              >
                Register
              </span>
            </Typography>
          </RegisterDiv>
        </LoginBox>
      </RightContainer>
    </LoginContainer>
  );
}
