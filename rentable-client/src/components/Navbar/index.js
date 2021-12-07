import React from "react";
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from "./NavbarElements";

const Navbar = (props) => {
  return (
    <div>
      <Nav>
        <NavLink to="/">
          <h1>rentable</h1>
          {/* <img src="rentable_logo.png" alt="rentable"></img> */}
        </NavLink>
        <Bars></Bars>
        <NavMenu>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/services">Services</NavLink>
          <NavLink to="/contact-us">Contact Us</NavLink>
          <NavLink to="/chat-with-us">Chat with Us</NavLink>

          {!props.loginStatus ? (
            <NavLink to="/owner-signin">List with Us</NavLink>
          ) : null}

          {/* <NavLink to="/signup">Sign Up</NavLink> */}
          {props.loginStatus && props.userType == "renter" ? (
            <NavLink to="/renter-dashboard">Renter Dashboard</NavLink>
          ) : null}

          {props.loginStatus && props.userType == "owner" ? (
            <NavLink to="/owner-dashboard">Owner Dashboard</NavLink>
          ) : null}

          {props.loginStatus && props.userType == "admin" ? (
            <NavLink to="/admin-dashboard">Admin Dashboard</NavLink>
          ) : null}
        </NavMenu>
        {props.loginStatus ? (
          <NavBtn>
            <NavBtnLink
              to="/"
              onClick={() => {
                props.handleLogout();
              }}
            >
              Log Out
            </NavBtnLink>
          </NavBtn>
        ) : (
          <NavBtn>
            {/* <NavBtnLink to="/signup">Register</NavBtnLink> */}

            <NavBtnLink to="/signin">Sign In</NavBtnLink>
          </NavBtn>
        )}
      </Nav>
    </div>
  );
};

export default Navbar;
