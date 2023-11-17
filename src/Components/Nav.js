import React from "react";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

import { useCookies } from "react-cookie";
import "../css/Nav.css";
import hamburger from "../images/hamburger.png"

const Nav = () => {
  const [logOut, setLogOut] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [openNav, setOpenNav] = useState(false);

  const handleLogout = () => {
    removeCookie("AuthToken");
    removeCookie("ID");
    removeCookie("Username");
    setLogOut(false);
  };



  const statement = openNav || window.innerWidth > 600;

  return (
    <>
      <div id="nav-container">
        {window.innerWidth < 600 && (
          <button id="open-nav" onClick={() => setOpenNav(!openNav)}>
            <img id="hamburger-icon" src={hamburger}/>
          </button>
        )}

        {statement && <>
          <div className="nav-links-container">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/transactions">Transactions</NavLink>
            <NavLink to="/add-card">Add Card</NavLink>
            <NavLink to="/edit-profile">Edit Profile</NavLink>
            <NavLink to="/manage-cards">Manage Cards</NavLink>
          </div>
          <button id="logout" onClick={() => setLogOut(true)}>
            Logout
          </button>
        </>}

        {logOut && (
          <div id="logout-container">
            <button onClick={() => setLogOut(false)} className="close-btn">
              X
            </button>
            <h1>Are you sure you want to logout?</h1>
            <button onClick={handleLogout} className="logout-btn btn">
              Confirm
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Nav;
