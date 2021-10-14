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
          <h1>Rentable</h1>
        </NavLink>
        <Bars />
        <NavMenu>
          <NavLink to="/about" activeStyle>
            About
          </NavLink>
          <NavLink to="/services" activeStyle>
            Services
          </NavLink>
          <NavLink to="/contact-us" activeStyle>
            Contact Us
          </NavLink>
          <NavLink to="/signup" activeStyle>
            Sign Up
          </NavLink>
          <NavLink to="/renter-account" activeStyle>
            My Account
          </NavLink>
        </NavMenu>
        {props.loginStatus ? (
          <NavBtn>
            <NavBtnLink to="/signin">Log Out</NavBtnLink>
          </NavBtn>
        ) : (
          <NavBtn>
            <NavBtnLink to="/signin">Sign In</NavBtnLink>
          </NavBtn>
        )}
      </Nav>
    </div>
  );
};

export default Navbar;
