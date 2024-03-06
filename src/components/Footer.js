import react, {useState, useEffect} from "react";
import "../components/Footer.css";

const footer = () =>{
    
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    
    
    return(
        <>
        <div className="footer-container">
            <div className="footer">
                <h3 className="copyRight">© {currentYear} Copyright: Ethio Traffic. All rights reserved. </h3>
            </div>
        </div>
        </>

    )
}
export default footer;