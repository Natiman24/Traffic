import React, { useState, useEffect } from "react";
import "./../css/Driver_Info2.css";
import "./../css/OverlayPage.css";
import axios from "axios";
import Cookies from "js-cookie";



const Driver_Info2 = () => {
  const [showOverlay, setShowOverlay] = useState(false);
  const [showOverlay1, setShowOverlay1] = useState(false);
  const [driverData, setDriverData] = useState([]);
  const [penaltyData, setPenaltyData] = useState([]);
  const [totalCount, setTotalCount] = useState();
  const cookie = Cookies.get('LicenseId') !== undefined;
  

  useEffect(() => {
    if(!cookie){
      alert("No License Id selected");
      window.location.href = "/driver_info";
    }else{
      const licenseId = Cookies.get('LicenseId');
      const fetchData = async () => {
        
      try {
      const response = await axios.get("http://localhost:4100/Searchbyid",{
        params: {
          licenseId: licenseId,
          },
        });
      
        const { data } = response;
        console.log("license: ",licenseId);
        setDriverData(data);
        setPenaltyData(data.SearchResults);
      
      
    
} catch (error) {
    console.log(error);
  }
};
fetchData();
    }
    
  }, []);
  console.log(driverData);

const handleClose = () => {
  setShowOverlay1(false);
  setShowOverlay(false);
};

const handleOpen = () => {
  if(penaltyData.length == 0){
    setShowOverlay1(true);

  }else{
  countCalc();
  setShowOverlay(true);
  }
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB");
};

const formatTime = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString();
};



const countCalc = () => {
  let count = 0;
  let total = 0;
  
  for(let i=0; i<penaltyData.length; i++){
     count = penaltyData[i].degreeOfPenalty - 1;
     total += count;
     
  }
  setTotalCount(total);
}

  return (
    <>
    <div className="Driver-Info2-table-wrapper">
      
      <div className="Driver-Info2-table-page">
        <h1>Driver Information</h1>
        <table>
          <thead>
            <tr>
              <th>LicenseId</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Sex</th>
              <th>DOB</th>
              <th>Nationality</th>
              <th>Phone Numnber</th>
              <th>Blood Type</th>
              <th>Grade</th>
              <th>Issue Date</th>
              <th>Expiry Date</th>
            </tr>
          </thead>
          <tbody>
            {driverData && (
              <tr key={driverData.licenseID}>
                <td>{driverData.licenseID}</td>
                <td>{driverData.firstName}</td>
                <td>{driverData.lastName}</td>
                <td>{driverData.Sex}</td>
                <td>{driverData.DOB}</td>
                <td>{driverData.Nationality}</td>
                <td>{driverData.Tel}</td>
                <td>{driverData.Blood_Type}</td>
                <td>{driverData.grade}</td>
                <td>{driverData.Issue_Date}</td>
                <td>{driverData.Expiry_Date}</td>
              </tr>
            )}
          </tbody>
        </table>
        <button className="Driver-Info2-button" onClick={handleOpen}>
          View Penalty Information
        </button>
      </div>
      </div>

      <>
        {showOverlay && (
          <div className="overlay-container">
            <div className="overlay-content">
              <div className="Driver-Info2-table">
                <h1>Penalty History</h1>
                <table>
                  <thead>
                    <tr>
                      <th>LicenseId</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Plate Number</th>
                      <th>Degree of Penalty</th>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Reason</th>
                      <th>Place</th>
                      <th>Traffic Name</th>
                      <th>Payment Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {penaltyData && penaltyData.map((penalty) => (
                      <tr key={penalty._id.toString()}>
                        <td>{penalty.licenseID}</td>
                        <td>{penalty.firstName}</td>
                        <td>{penalty.lastName}</td>
                        <td>{penalty.plateNum}</td>
                        <td>{penalty.degreeOfPenalty}</td>
                        <td>{formatDate(penalty.date)}</td>
                        <td>{formatTime(penalty.date)}</td>
                        <td>{penalty.reason}</td>
                        <td>{penalty.place}</td>
                        <td>{penalty.trafficName}</td>
                        <td>{penalty.status ? "Paid" : "Unpaid"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <h3>Penalty Points = {totalCount}</h3>
              </div>

              <button className="Driver-Info2-button2" onClick={handleClose}>
                Close
              </button>
            </div>
          </div>
        )}
      </>

      <>
          {showOverlay1 && (
            <div className="overlay-container">
            <div className="overlay-content">
              <h2>There is no penalty associated with this driver.</h2>

              <div className="button2-containerr">
                <button className="overlayy-button" onClick={handleClose}>
                  Close
                </button>
              </div>
            </div>
            </div>
          )}
      </>
    </>
  );
                    
};

export default Driver_Info2;
