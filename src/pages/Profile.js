import React from "react";
import "./../css/Profile.css";
import jwt_decode from "jwt-decode";

const Profile = () => {
  
  

  const token = sessionStorage.getItem('token');
  const decodedToken = jwt_decode(token);
  const firstName = decodedToken.fName;
  const lastName = decodedToken.lName;
  const email = decodedToken.email;

  
  const changePassword = () =>{
    window.location.href = "/change_pass";
  }
  const logout = () =>{
    sessionStorage.removeItem('token');
    window.location.href = "/";
  }

  

  return (
    <>
      <div className="Profile-container-wrapper">
      <div className="header-box">
        <h1 className="Profile-h1">Profile</h1>
      </div>
      <div className="Profile-containerr">
        <div className="Profile-info">
        <h3>Name: {firstName} {lastName}</h3>
        <h3>Email: {email}</h3>
        </div>
        <div className="Profile-button-container">
        <button className="Profile-button1" onClick={changePassword}>
          Change Password
        </button>
        <button className="Profile-button2" onClick={logout}>
          Log out
        </button>
        </div>
      </div>
      </div>

    </>
  );
      
};

export default Profile;
