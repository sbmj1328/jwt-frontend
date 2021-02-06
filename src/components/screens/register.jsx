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
import { RegisterValidation } from "../utils/validation";
import { useSelector, useDispatch } from "react-redux";
import { registerAction } from "../../dataStore/redux/action/register-action";

const RegisterContainer = styled.div`
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

const RegisterText = styled.p`
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
    margin-top: 18px;
  }
`;

const RegisterBtn = styled(Button)`
  && {
    background-color: #061840;
    opacity: 1;
    padding: 10px 16px;
  }
`;
const LoginDiv = styled.div`
  margin-top: 10px;
`;

const RegisterBox = styled(Box)`
  && {
    max-width: 500px;
  }
`;

// Login Component
export default function Login() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { registerReducer } = useSelector((state) => state);
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    cPassword: "",
    showPassword: false,
    showCPassword: false,
  });
  const [errors, setError] = useState({});
  const [isSubmitting, setSubmiting] = useState(false);

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      submitRegister();
    }
  }, [errors]);

  const submitRegister = () => {
    dispatch(
      registerAction(state, () => {
        history.push("/auth/login");
        setSubmiting(false);
      })
    );
  };

  const regValidate = () => {
    setError(RegisterValidation(state));
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

  const handleCPassVisible = (name) => {
    setState({
      ...state,
      showCPassword: !state.showCPassword,
    });
  };

  const ErrorHelper = styled.p`
    color: red;
    text-align: left;
    font-size: 12px;
    margin-top: 5px;
    margin-left: 5px;
  `;

  return (
    <RegisterContainer>
      <LeftContainer>
        <Img src={JWT_IMG} />
      </LeftContainer>
      <RightContainer>
        <RegisterBox
          className="auth_box"
          bgcolor="white"
          boxShadow="2"
          borderRadius="12px"
          textAlign="center"
          p="24px"
          mt="50px"
        >
          <RegisterText>Log into your Account</RegisterText>
          <FormCtrl variant="outlined" className="textfield_custom_auth">
            <InputLabel htmlFor="outlined-adornment-name">Name</InputLabel>
            <OutlinedInput
              id="outlined-adornment-name"
              type={"text"}
              value={state.name}
              onChange={(e) => handleChange(e, "name")}
              labelWidth={40}
            />
            <ErrorHelper className="auth_helper_text">
              {errors?.name}
            </ErrorHelper>
          </FormCtrl>

          <FormCtrl variant="outlined" className="textfield_custom_auth">
            <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
            <OutlinedInput
              id="outlined-adornment-email"
              type={"text"}
              value={state.email}
              onChange={(e) => handleChange(e, "email")}
              labelWidth={40}
            />
            <ErrorHelper className="auth_helper_text">
              {errors?.email}
            </ErrorHelper>
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
            <ErrorHelper className="auth_helper_text">
              {errors?.password}
            </ErrorHelper>
          </FormCtrl>
          <FormCtrl variant="outlined" className="textfield_custom_auth">
            <InputLabel htmlFor="outlined-adornment-c-password">
              Confirm Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-c-password"
              type={state.showCPassword ? "text" : "password"}
              value={state.cPassword}
              onChange={(e) => handleChange(e, "cPassword")}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleCPassVisible}
                    edge="end"
                  >
                    {state.showCPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={140}
            />
            <ErrorHelper className="auth_helper_text">
              {errors?.cPassword}
            </ErrorHelper>
          </FormCtrl>

          <br />
          <br />
          {registerReducer.isLoading ? (
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
          <RegisterBtn
            disabled={registerReducer.isLoading}
            className="auth_login_btn auth_button"
            disableElevation
            variant="contained"
            color="primary"
            fullWidth
            onClick={regValidate}
          >
            Register
          </RegisterBtn>
          <LoginDiv className="auth_login_forgot_password_container">
            <Typography>
              <span>Already have an account? </span>
              <span
                style={{ color: "#061840", cursor: "pointer" }}
                onClick={() => {
                  history.push("/auth/login");
                }}
              >
                Login
              </span>
            </Typography>
          </LoginDiv>
        </RegisterBox>
      </RightContainer>
    </RegisterContainer>
  );
}
