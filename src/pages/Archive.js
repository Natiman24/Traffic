import React, { useState, useEffect } from "react";
import axios from "axios";
import "./../css/Archive.css";
import "./../css/OverlayPage.css";

export default function Archive() {
  const [showOverlay1, setShowOverlay1] = useState(false);
  const [selectedArchive, setSelectedArchive] = useState(null);
  const [ArchiveData, setArchiveData] = useState(null);
  const [showOverlay2, setShowOverlay2] = useState(false);

  useEffect(() => {
    

    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/viewcomplaints");
      setArchiveData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOpen = (id) => {
    const Archive = ArchiveData.find((Archive) => Archive._id.toString() === id);
    setSelectedArchive(Archive);
    setShowOverlay1(true);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/deletecomp`, {
        data: {
          boil: true,
          Id: selectedArchive._id.toString()
        }
      });
      // Refresh the data after deletion
      fetchData();
    } catch (error) {
      console.error(error);
    }
    setShowOverlay2(false);
    fetchData();
  };

  const handleClose = () => {
    setShowOverlay1(false);
  };

  const Archive = () => {
    window.location.href = "/complaint";
  };

  const handleOpenDelete = (id) => {
    const Archive = ArchiveData.find((Archive) => Archive._id.toString() === id);
    setSelectedArchive(Archive);
    setShowOverlay2(true);
  }
  const handleDeleteClose = () => {
    setShowOverlay2(false);
  }

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
      <div className="Archive-box-wrapper">
      <div className="Archive">
        <h1 className="Archive-header">Archives</h1>
        <button onClick={Archive}>Close Archives</button>
      </div>
      {ArchiveData &&
        ArchiveData
          .filter((Archive) => Archive.seenStatus)
          .reverse() // Reverse the order of Archives
          .map((Archive) => (
            <div className="Archive-box" key={Archive._id.toString()}>
              <div className="Archive-details">
                <div className="Archive-left">
                  <p>Penalty Id: {Archive.pen_id.toString()}</p>
                  <p className="cl-last">Method of Communication: {Archive.responsePreference}</p>
                </div>
                <div className="Archive-right">
                  <p className="Archive-Date">Complaint Date: {formatDate(Archive.complaintDate)}</p>
                  <div className="button-containerr">
                    <button className="Archive-button" onClick={() => handleOpen(Archive._id.toString())}>
                      See Details
                    </button>
                    <button className="Archive-button" onClick={() => handleOpenDelete(Archive._id.toString())}>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      {showOverlay1 && selectedArchive && (
        <div className="overlay-container">
          <div className="overlay-content">
            <div className="Archive-table">
              <h1>Penalty</h1>
              <div className="Archive-table-container">
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
                  <tr key={selectedArchive.pen_id}>
                    <td>{selectedArchive.PenaltyComp[0].licenseID}</td>
                    <td>{selectedArchive.PenaltyComp[0].firstName}</td>
                    <td>{selectedArchive.PenaltyComp[0].lastName}</td>
                    <td>{selectedArchive.PenaltyComp[0].plateNum}</td>
                    <td>{selectedArchive.PenaltyComp[0].degreeOfPenalty}</td>
                    <td>{formatDate(selectedArchive.PenaltyComp[0].date)}</td>
                    <td>{formatTime(selectedArchive.PenaltyComp[0].date)}</td>
                    <td>{selectedArchive.PenaltyComp[0].reason}</td>
                    <td>{selectedArchive.PenaltyComp[0].place}</td>
                    <td>{selectedArchive.PenaltyComp[0].trafficName}</td>
                  </tr>
                </tbody>
              </table>
              </div>

              <h3>Complaint Message: {selectedArchive.complaint_Message}</h3>
            </div>

            <button className="Archive3-button" onClick={handleClose}>
              Close
            </button>
          </div>
        </div>
      )}

{showOverlay2 && selectedArchive && (
        <div className="overlay-container">
          <div className="overlay-content">
            <h2>Are you sure you want to Delete?</h2>

            <div className="button2-containerr">
            <button className="Archive3-button" onClick={handleDeleteClose}>
              No
            </button>
            <button className="Archive2-button" onClick={handleDelete}>
              Yes
            </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
