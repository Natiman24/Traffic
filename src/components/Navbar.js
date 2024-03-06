import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
/*import { GiRocketThruster } from "react-icons/gi"; */
import { FaBars, FaTimes } from "react-icons/fa";
import { IconContext } from "react-icons/lib";
import { NavLink } from "react-router-dom";


export default function Navbar() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  // const handleRemoveSession = () => {
  //   sessionStorage.removeItem('token');
  //   setClick(false);
  // };

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <nav className="navbarr">
          <div className="navbarr-container containerr">
            <Link to="/home" className="navbarr-logo" onClick={closeMobileMenu}>
              <img src="/Images/C.png" className="img-logoo" alt="logo"/>
              Ethio Traffic
            </Link>
            <div className="menuu-icon" onClick={handleClick}>
              {click ? <FaTimes /> : <FaBars />}
            </div>
            <ul className={click ? "navv-menu active" : "navv-menu"}>
              <li className="navv-item">
                <NavLink
                  to="/home"
                  className={({ isActive }) =>
                    "navv-links" + (isActive ? " activatedd" : "")
                  }
                  onClick={closeMobileMenu}
                >
                  Home
                </NavLink>
              </li>
              <li className="navv-item">
                <NavLink
                  to="/driver_info"
                  className={({ isActive }) =>
                    "navv-links" + (isActive ? " activatedd" : "")
                  }
                  onClick={closeMobileMenu}
                >
                  Driver Information
                </NavLink>
              </li>
              <li className="navv-item">
                <NavLink
                  to="/complaint"
                  className={({ isActive }) =>
                    "navv-links" + (isActive ? " activatedd" : "")
                  }
                  onClick={closeMobileMenu}
                >
                  Complaints
                </NavLink>
              </li>
              <li className="navv-item">
                <NavLink
                  to="/report"
                  className={({ isActive }) =>
                    "navv-links" + (isActive ? " activatedd" : "")
                  }
                  onClick={closeMobileMenu}
                >
                   Generate Report
                </NavLink>
              </li>
              <li className="navv-item">
                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    "navv-links" + (isActive ? " activatedd" : "")
                  }
                  onClick={closeMobileMenu}
                >
                  Profile
                </NavLink>
              </li>
               <li className="navv-item">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    "navv-links" + (isActive ? " activated" : "")
                  }
                  onClick={closeMobileMenu}
                >
                  Log out
                </NavLink>
              </li> 
            </ul>
          </div>
        </nav>
      </IconContext.Provider>
    </>
  );
}

