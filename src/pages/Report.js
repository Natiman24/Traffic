import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import "./../css/Report.css";
import './../css/Report2.css';
import './../css/OverlayPage.css';

// Custom theme for the calendar
const customTheme = (theme) => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary: "#4caf50", // Adjust the primary color as needed
    primary75: "#1a4b11", // Adjust the primary light color as needed
  },
});


export default function ReportGenerator() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [showOverlay, setShowOverlay] = useState(false);
  const [reportData, setReportData] = useState([]);
  const [formattedStartDate, setFormattedStartDate] = useState(null);
  const [formattedEndDate, setFormattedEndDate] = useState(null);
  const [total, setTotal] = useState();

  const isReportDisabled = !startDate || !endDate;

  useEffect(() => {
    let totalSum = 0;
        reportData.forEach((gradeData) =>{
          totalSum += gradeData.paymentCount;
        });
        setTotal(totalSum);
  }, [reportData])

  const handleClose = () => {
    setShowOverlay(false);
   };



  const handleGenerateReport = async(event) => {
   event.preventDefault();

    if (isReportDisabled) {
      setErrorMessage("Enter both Start and End date!");
    } else {
      try {
        const FormattedStartDate = startDate.toISOString().split("T")[0];
        const FormattedEndDate = endDate.toISOString().split("T")[0];
        
        const monthNames = [
          "January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"
        ];
        
        const formattedStart = `${monthNames[startDate.getMonth()]} ${startDate.getDate()}, ${startDate.getFullYear()}`;
        const formattedEnd = `${monthNames[endDate.getMonth()]} ${endDate.getDate()}, ${endDate.getFullYear()}`;
        
        setFormattedStartDate(formattedStart);
        setFormattedEndDate(formattedEnd);

        const response = await axios.post("http://localhost:4200/generateReport", {
          startDate: FormattedStartDate,
          endDate: FormattedEndDate,

        });
        setReportData(response.data.penaltiesByGrade);
        setErrorMessage("");
        setShowOverlay(true);
        
      } catch (error) {
        console.error(error);
        setErrorMessage("An error occurred while generating the report");
      }
    }
  };

  const print = () => {
    const doc = new jsPDF();
    const tableTitle = `Report from ${formattedStartDate} - ${formattedEndDate}`;
    const tableData = reportData.map((gradeData) => [
      gradeData.grade,
      gradeData.count,
      `${gradeData.paymentCount} ETB`,
    ]);
  
    // Calculate table width and position
    const tableWidth = 180; // Adjust the width as needed
    const startX = (doc.internal.pageSize.getWidth() - tableWidth) / 2;
  
    // Set the font style for table title
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text(tableTitle, doc.internal.pageSize.getWidth() / 2, 15, {
      align: "center",
    });
  
    // Set the font style for table data
    doc.setFontSize(20);
    doc.setFont("helvetica", "normal");
  
    doc.autoTable({
      head: [["Degree of Penalty", "Number of Penalized Drivers", "Total Payment"]],
      body: tableData,
      startY: 30, // Adjust the starting position of the table as needed
      startX: startX, // Center align the table horizontally
      margin: { top: 50 }, // Adjust the top margin of the table as needed
    });

    const summary = `Total Sum = ${total} ETB`;
    doc.setFontSize(14);
    doc.text(summary, doc.internal.pageSize.getWidth() / 2 ,
     doc.autoTable.previous.finalY + 10, {
      align: "center",
     });
  
    doc.save("report.pdf");
  };
  
  


  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleGenerateReport(event);
    }
  };


  return (
    <>
    <div className="report-generator-container-wrapper">
    <div className="report-box">
    <h1>Report Generator</h1>
    </div>
    <div className="report-generator-container">
      <h3>Enter the Start and End dates for the report you want to generate!</h3>
      <div className="date-picker-container">
        <label>Start Date:</label>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          dateFormat="yyyy/MM/dd"
          showTimeSelect={false}
          className="custom-datepicker"
          calendarClassName="custom-calendar"
          theme={customTheme}
          onKeyPress={handleKeyPress}
        />
      </div>
      <div className="date-picker-container">
        <label>End Date:</label>
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          dateFormat="yyyy/MM/dd"
          showTimeSelect={false}
          className="custom-datepicker"
          calendarClassName="custom-calendar"
          theme={customTheme}
          onKeyPress={handleKeyPress}
        />
      </div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <button className="Report-button" onClick={handleGenerateReport}>Generate Report</button>
    </div>
    </div>
    <>
    {showOverlay && reportData &&
      (<div className="overlay-container">
      <div className="overlay-content">
        <div className="Report-table">
        <h1> Report </h1>
          <table>
            <thead>
              <tr>
                <th>Degree of Penalty</th>
                <th>Number of Penalized Drivers</th>
                <th>Total Payment</th>
              </tr>
            </thead>
            <tbody>
                {reportData.map((gradeData) => (
                    <tr key={gradeData.grade}>
                      <td>{gradeData.grade}</td>
                      <td>{gradeData.count}</td>
                      <td>{gradeData.paymentCount} ETB</td>
                    </tr>
                  ))}
            </tbody>
          </table>
          <h3>Total Sum = {total} ETB</h3>
        </div>
        <div className="Report-button-container">
        <button className="Report3-button" onClick={print}> Print </button>
        <button className="Report2-button" onClick={handleClose}> Close </button>
        </div>          
      </div>  
    </div>
  )}
  </>
    
    </>
  );
}
