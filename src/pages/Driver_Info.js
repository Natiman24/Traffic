import React, { useState } from "react";
import "./../css/Driver_Info.css";
import axios from "axios";
import Cookies from "js-cookie";
import Footer from "./../components/Footer"

const Driver_Info = () => {
  const [licenseId, setLicenseId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showOverlay, setShowOverlay] = useState(false);

  const cookie = Cookies.get('LicenseId') !== undefined;
  if(cookie){
    Cookies.remove('LicenseId');
  }

  const handleSearch = async () => {

    
    if (licenseId.length !== 6) {
      setErrorMessage("Only 6 digits are allowed!");
    } else {
      setErrorMessage("");

      try {
        const response = await axios.get("http://localhost:4100/Searchbyid",{
        params: {  
        licenseId: licenseId,
        },
      });
        
        const {licenseID} = response.data;
        console.log("license: ",licenseID );
        
        
        if (licenseID) {
          setLicenseId(licenseID);
          Cookies.set('LicenseId', licenseId, {expires: 1});
          
          console.log(licenseId);
          window.location.href = "/driver_info2";
        } else {
          setShowOverlay(true);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleClose = () => {
    setShowOverlay(false);
  };

  
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <>
      <div className="Driver-Info-container-wrapper">
      <div className="header-box">
        <h1 className="Driver-Info-h1">Driver Information</h1>
      </div>
      <div className="Driver-Info-container">
        <label htmlFor="licenseId">Enter the License Id of the driver</label>
        <div className="Driver-Info-searchbar">
          <input
            type="text"
            value={licenseId}
            minLength={6}
            maxLength={6}
            onChange={(e) => setLicenseId(e.target.value)}
            onKeyPress={handleKeyPress}
          />
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button className="Driver-Info-button" onClick={handleSearch}>
          Search
        </button>
      </div>
      </div>
      {/* <Footer/> */}
      

      {showOverlay && (
        <div className="overlay-containerr">
          <div className="overlay-contentt">
            <h2>There is no user with this ID.</h2>

            <div className="button2-containerr">
              <button className="overlay-button" onClick={handleClose}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
      
};

export default Driver_Info;
