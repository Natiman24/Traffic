import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { Snackbar, Button, SnackbarContent } from "@mui/material";
import { styled } from "@mui/system";
import "./../css/Change_Pass.css";
import axios from "axios";
import jwtDecode from "jwt-decode";

const StyledSnackbar = styled(Snackbar)(({ theme }) => ({
  "& .MuiSnackbarContent-root": {
    backgroundColor: "#001755",
    color: "white",
    borderRadius: "5px",
    boxShadow: "0px 2px 4px rgba(0,0,0, 0.3)",
    height: "50px",
    fontSize: "16px",
  },
  // "& .MuiSnackbar-root":{
  //   margin: "100px",
  // },
}));

export default function PasswordChangePage() {
  const Navigate = useNavigate();

  const [oldpassword, setCurrentPassword] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const token = sessionStorage.getItem('token');
  useEffect(() =>{
    if(success && !openSnackbar){
      Navigate("/home");
    }
  },[success, openSnackbar]);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };
  if(!token){
    alert("You are logged out!");
    Navigate("/");
  } else{
  const decodedToken = jwtDecode(token);
  const email = decodedToken.email;
  
 

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "currentPassword") {
      setCurrentPassword(value);
    } else if (name === "newPassword") {
      setNewPassword(value);
    } else if (name === "confirmNewPassword") {
      setConfirmNewPassword(value);
    }
  };

  const validation = () => {
    if(newpassword.length < 8){
      return 1;
    } 
      const pattern = /^[A-Z]/;
    if(!pattern.test(newpassword)){
      return 2;
    }
    const passwordRegex = /[0-9!@#$%^&*]/;

    if (!newpassword.match(passwordRegex)) {   
      return 3;
    }else
      return true;
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    // Perform validation checks
    if(validation() === 1){
      
      setSnackbarMessage(
        "Password must be at least 8 characters long!"
      );
      setOpenSnackbar(true);
      }else if(validation() === 2){
        
        setSnackbarMessage(
          "Password must begin with an uppercase letter!"
      );
        setOpenSnackbar(true);
      }else if(validation() === 3){
        
        setSnackbarMessage(
          "Password must contain a number or special character!"
        );
        setOpenSnackbar(true);
      }else{
    
    if(newpassword !== confirmNewPassword){
      setErrorMessage("The new passwords don't match!");
    }else{
      try{
          const response = await axios.post("http://localhost:4400/changepassword", {
            email,
            oldpassword,
            newpassword
          });
      
          if(response.data.message === "Password updated successfully"){
            setSnackbarMessage("Password Changed Successfully!");
            setErrorMessage("");
            setOpenSnackbar(true);
            setSuccess(true); 
          }
        }catch(error){
          if (error.response && error.response.status === 401) {
            // setSnackbarMessage("The password you entered is incorrect password!")
            // setOpenSnackbar(true);
            setErrorMessage("The password you entered is incorrect password!");
          } else {
            console.log(error);
            setErrorMessage("An error has occurred!");
          }
        }
      }
    }
      };
    
  return (
    <>
    <div className="password-change-container-wrapper">
    <div className="change_pass-box">
      <h1 className="change_pass">Change Password</h1>
    </div>
    <div className="password-change-container">
      <form onSubmit={handleSubmit} className="password-change-form">
        <div className="form-group">
          <label htmlFor="currentPassword">Current Password</label>
          <div className="input-group">
          <input
            type="password"
            id="currentPassword"
            name="currentPassword"
            value={oldpassword}
            onChange={handleChange}
            required
            className="pas1"
          />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="newPassword">New Password</label>
          <div className="input-group">
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            value={newpassword}
            onChange={handleChange}
            required
            className="pas2"
          />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="confirmNewPassword">Confirm New Password</label>
          <div className="input-group">
          <input
            type="password"
            id="confirmNewPassword"
            name="confirmNewPassword"
            value={confirmNewPassword}
            onChange={handleChange}
            required
            className="pas3"
          />
          </div>
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button type="submit" className="submit-button">
          <span>Change Password</span>
        </button>
      </form>
    
    </div>
    <StyledSnackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        open={openSnackbar}
        onClose={handleCloseSnackbar}
      >
        <SnackbarContent
          message = {snackbarMessage}
          action={
            <Button color="inherit" size="small" onClick={handleCloseSnackbar}>
              OK
            </Button>
          }
        />
      </StyledSnackbar>
    </div>
    </>
  );
  }
}