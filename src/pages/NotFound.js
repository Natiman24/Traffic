import React from "react"
import "./../css/NotFound.css"
import {Link} from "react-router-dom";

const NotFound = () =>{
    return (
    <>
    <div className="notFound-wrapper">
    <nav className="navv">
      <div className="navbarrr">
        <Link to="/" className="navbarrr-logo">
          <img src="/Images/C.png" className="imgg-logo" alt="logo"/>
               <p className="ethio">Ethio Traffic</p>
        </Link>
      </div>
    </nav>
    <div className="notFound-header-container">
    <h1 className="notFound">404 Not Found!</h1>
    <h2 className="error">The page you are looking for doesn't exist!</h2>
    </div>
    </div>
    </>
    )
  }
  export default NotFound;