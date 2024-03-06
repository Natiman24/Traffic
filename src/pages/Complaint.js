import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer from "./../components/Footer"
import "./../css/Complaint.css";
import "./../css/OverlayPage.css";

export default function Complaint() {
  const [showOverlay, setShowOverlay] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [complaintData, setComplaintData] = useState(null);

  useEffect(() => {

    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/viewcomplaints");
      setComplaintData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOpen = (id) => {
    const complaint = complaintData.find((complaint) => complaint._id.toString() === id);
    setSelectedComplaint(complaint);
    setShowOverlay(true);
  };

  const handleClose = () => {
    setShowOverlay(false);
  };

  const Archive = () => {
    window.location.href = "/archive";
  };
  
  const handleArchive = async (id) => {
    try {
      const response = await axios.put("http://localhost:5000/changecompstatus", {
        Id: id,
        boil: true
      });
      console.log(response.data);
      fetchData();
    } catch (error) {
      console.error(error);
    }

  };

  // Function to parse the date in "dd/MM/yyyy" format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB");
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString();
  };


  return (
    <>
      <div className="Complaint-box-wrapper">
      <div className="Complaint">
        <h1 className="Complaint-header">Complaints</h1>
        <button onClick={Archive}>Open Archives</button>
      </div>
      {complaintData &&
        complaintData
          .filter((complaint) => !complaint.seenStatus)
          .map((complaint) => (
            <div className="Complaint-box" key={complaint._id.toString()}>
              <div className="Complaint-details">
                <div className="Complaint-left">
                  <p>Penalty Id: {complaint.pen_id.toString()}</p>
                  <p className="cl-last">Method of Communication: {complaint.responsePreference}</p>
                </div>
                <div className="Complaint-right">
                  <p className="Complaint-Date">Complaint Date: {formatDate(complaint.complaintDate)}</p>
                  <div className="button-container">
                    <button className="Complaint-button" onClick={() => handleOpen(complaint._id.toString())}>
                      See Details
                    </button>
                    <button className="Complaint-button" onClick={() => handleArchive(complaint._id.toString())}>Archive</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          </div>
          {/* <Footer/> */}

      {showOverlay && selectedComplaint && (
        <div className="overlay-container">
          <div className="overlay-content">
            <div className="Complaint-table">
              <h1>Penalty</h1>
              <div className="Complaint-table-container">
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
                  </tr>
                </thead>
                <tbody>
                  <tr key={selectedComplaint.pen_id}>
                    <td>{selectedComplaint.PenaltyComp[0].licenseID}</td>
                    <td>{selectedComplaint.PenaltyComp[0].firstName}</td>
                    <td>{selectedComplaint.PenaltyComp[0].lastName}</td>
                    <td>{selectedComplaint.PenaltyComp[0].plateNum}</td>
                    <td>{selectedComplaint.PenaltyComp[0].degreeOfPenalty}</td>
                    <td>{formatDate(selectedComplaint.PenaltyComp[0].date)}</td>
                    <td>{formatTime(selectedComplaint.PenaltyComp[0].date)}</td>
                    <td>{selectedComplaint.PenaltyComp[0].reason}</td>
                    <td>{selectedComplaint.PenaltyComp[0].place}</td>
                    <td>{selectedComplaint.PenaltyComp[0].trafficName}</td>
                  </tr>
                </tbody>
              </table>
              </div>

              <h3>Complaint Message: {selectedComplaint.complaint_Message}</h3>
            </div>

            <button className="Complaint2-button" onClick={handleClose}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
