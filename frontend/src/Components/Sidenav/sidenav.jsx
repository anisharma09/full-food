import { useState } from "react";
// import { Context } from "../../main";
import { Link } from "react-router-dom";
import { FaBars } from 'react-icons/fa';
// import { CgProfile } from "react-icons/cg";
import { RxCross2 } from "react-icons/rx";
import "./Navigation.css";

const Navigation = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  // const { user } = useContext(Context);

  const data = JSON.parse(localStorage.getItem("userData"));
  const handleNavToggle = (e) => {
    e.preventDefault();
    console.log("Nav toggle clicked", !isNavOpen);
    setIsNavOpen(!isNavOpen);
  };
  // console.log("djknjkcnoer",data)
  const renderMenuItems = () => {
    switch (data.role) {
      case "doner":
        return (
          <>
            <li>
              <Link to="/donor/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/donate">Donate</Link>
            </li>
            <li>
              <Link to="/pending-donations">My Pending Donations</Link>
            </li>
            <li>
              <Link to="/previous-donations">My Previous Donations</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          </>
        );
      case "admin":
        return (
          <>
            <li>
              <Link to="/admin/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/admin/pendingdonation">Pending Donation</Link>
            </li>
            <li>
              <Link to="/admin/previousdonation">Previous Donation</Link>
            </li>
            <li>
              <Link to="/admin/agent">Agents</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          </>
        );
      case "agent":
        return (
          <>
          <li>
              <Link to="/agent/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/agent/pendingcollection">My Pending Collections</Link>
            </li>
            <li>
              <Link to="/agent/previouscollection">My Previous Collections</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          </>
        );
      default:
        return null;
    }
  };
  const renderHeader = () => {
    switch (location.pathname) {
      case "/donor/dashboard":
      case "/admin/dashboard":
      case "/agent/dashboard":
        return "Dashboard";
      case "/donate":
        return "Donate";
      case "/pending-donations":
        return "My Pending Donations";
      case "/previous-donations":
        return "My Previous Donations";
      case "/admin/pendingdonation":
        return "Pending Donation";
      case "/admin/previousdonation":
        return "Previous Donation";
      case "/admin/agent":
        return "Agents";
      case "/agent/pendingcollection":
        return "My Pending Collections";
      case "/agent/previouscollection":
        return "My Previous Collections";
      case "/profile":
        return "Profile";
      default:
        return "Dashboard";
    }
  };


  return (
    <>
      <div className={`primary-nav ${isNavOpen ? "openNav" : ""}`}>
        <button
          className="hamburger open-panel nav-toggle"
          onClick={handleNavToggle}
          style={{color:"black !important"}}
        >
          <span className="screen-reader-text">Menu</span>
        </button>
        <nav role="navigation" className="menu">
          <a href="#" className="logotype">
            Welcome {data.name}
          </a>
          <div className="overflow-container">
            <ul className="menu-dropdown">{renderMenuItems()}</ul>
          </div>
        </nav>
      </div>
      <div
        className={`new-wrapper ${isNavOpen ? "shifted" : ""}`}
        style={{ display: "flex" }}
      >
        <button onClick={handleNavToggle}>
          {" "}
          <FaBars />{" "}
        </button>
        {/* <h1>Dashboard</h1> */}
        <h1>{renderHeader()}</h1>
      </div>
    </>
  );
};

export default Navigation;
