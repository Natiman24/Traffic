import React, { useState, useRef } from "react";
import { Snackbar, Button, SnackbarContent } from "@mui/material";
import { styled } from "@mui/system";
import "./../css/Login.css";
import axios from "axios";
import jwt_decode from "jwt-decode";

const StyledSnackbar = styled(Snackbar)(({ theme }) => ({
  "& .MuiSnackbarContent-root": {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    color: "black",
    borderRadius: "5px",
    boxShadow: "0px 2px 4px rgba(0,0,0, 0.3)",
    height: "50px",
    fontSize: "16px",
  },
}));

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const passwordRef = useRef(null);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
    if(validation() === 1){
      setIsError(true);
      setSnackbarMessage(
        "Password must be at least 8 characters long!"
      );
      setOpenSnackbar(true);
      }else if(validation() === 2){
        setIsError(true);
        setSnackbarMessage(
          "Password must begin with an uppercase letter!"
      );
        setOpenSnackbar(true);
      }else if(validation() === 3){
        setIsError(true);
        setSnackbarMessage(
          "Password must contain a number or special character!"
        );
        setOpenSnackbar(true);
      }else{
            
      const response = await axios.post("http://localhost:4400/Adminlogin", {
        email,
        password,
      });
      if (
        response.data.message === "Email not valid" ||
        response.data.message === "Password not correct!"
      ) {
        setIsError(true);
        setSnackbarMessage("Invalid Email or Password!");
        setOpenSnackbar(true);
      } else {
        setIsError(false);
        const token = response.data.token;
        const hasSession = sessionStorage.getItem("token") !== undefined;

        if (hasSession) {
          sessionStorage.removeItem("token");
        }

        console.log("Token: ", token);
        const decodedToken = jwt_decode(token);
        console.log(decodedToken);

        sessionStorage.setItem("token", token);
        window.location.href = "/home";
      }
    }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setIsError(true);
        setSnackbarMessage("Invalid Credentials!");
       
      } else {
        console.error(error);
      }
    }
  
  };

  const togglePasswordVisibility = () => {
    const passwordField = passwordRef.current;
    passwordField.type = passwordField.type === "password" ? "text" : "password";
  };

  const validation = () => {
    if(password.length < 8){
      return 1;
    } 
      const pattern = /^[A-Z]/;
    if(!pattern.test(password)){
      return 2;
    }
    const passwordRegex = /[0-9!@#$%^&*]/;

    if (!password.match(passwordRegex)) {   
      return 3;
    }else
      return true;
  };

  return (
    <div className="App">
      <div className="login-title">
        <h1 className="login-h1">Ethio Traffic</h1>
        <div className="login-container">
          <h2 className="login-h2">Login</h2>
          <form className="login-form" onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              name="email"
              required
              className={isError ? "error-input" : ""}
            />
            <label htmlFor="password">Password</label>
            <div className="password-container">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                required
                className={isError ? "error-input" : ""}
                ref={passwordRef}
              />
              <i
                className={`fa-solid fa-eye${showPassword ? "-slash" : ""}`}
                id="show-password"
                onClick={togglePasswordVisibility}
              ></i>
            </div>
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
      <StyledSnackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={openSnackbar}
        onClose={handleCloseSnackbar}
      >
        <SnackbarContent
          message = {snackbarMessage}
          action={
            <Button color="inherit" size="small" onClick={handleCloseSnackbar}
            >
              OK
            </Button>
          }
        />
      </StyledSnackbar>
    </div>
  );
}
