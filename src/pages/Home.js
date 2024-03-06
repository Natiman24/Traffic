import React from "react";
import jwt_decode from "jwt-decode";
import "./../css/Home.css";
import Footer from "../components/Footer"
import Data from "./HomeContents"
import image1 from "./../Images/penalization.jpg"
import image2 from "./../Images/traffic controllers.jpg"
import image3 from "./../Images/signs.jpg"
import image4 from "./../Images/suspension.jpg"

export default function Home() {
  const token = sessionStorage.getItem('token');
  const decodedToken = jwt_decode(token);
  const firstName = decodedToken.fName;
  const lastName = decodedToken.lName;

  return (
    <>
    <div className="home-container-wrapper">
      <div className="home-container">
        <h2>Welcome back {firstName} {lastName}!</h2>
         <div className="boxes-container">
          <div className="box">
           <Data
            img = {image1}
            header = "Penalization"
            content = {`Penalty points are not recorded on drivers files for the first level traffic offences,
            but it holds a fine of 100 Br. The second and third levels have one and two penalty points, 
            while the fourth and fifth levels have three and four penalty points, respectively,
            in addition to payment of fines up to 350 Br.`}
            /> 
          </div>
          <div className="box">
          <Data 
            img = {image2}
            header = "Offences commited by Traffic controllers"
            content = {`1) Any traffic controller who enforces the provisions of this Regulation 
            shall enforce them impartially and without violating human rights.
            2) If a Traffic Control Office believes that
            a traffic controller has committed offence while enforcing the provisions
            of this Regulation, without prejudice to his liability in accordance with
            appropriate law, shall remove him from his traffic controlling duty in
            accordance with Schedule C of this Regulation.`}
          />
          </div>
          <div className="box">
          <Data 
            img = {image3}
            header = "Major Traffic offenses"
            content = {`According to a study, Traffic flow obstruction is the most committed traffic offence. 
            The second and third major types of traffic offences were disrespecting prohibited signs. 
            The fourth and fifth major traffic offenses are overloading and using mobile phones while driving.
            These top five traffic offenses constitues to about 50% of all traffic offences.`}
          />
          </div>
          <div className="box">
          <Data 
            img = {image4}
            header = "Suspension"
            content = {`Drivers with accumulated penalty points of 17 and above will be suspended for a one-year period. 
            Traffic accidents resulting in death carry 28 penalty points and accidents causing serious physical injuries entail 22 penalty points. 
            In both situations, the driving license of the driver responsible for the accidents is suspended for up to one year.`}
          />
          </div>
      </div> 
      
      </div>
      {/* <Footer /> */}
    </div>
    
    
    
    </>
  );
}
