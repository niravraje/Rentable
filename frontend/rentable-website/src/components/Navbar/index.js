import React from 'react'
import {
    Nav,
    NavLink,
    Bars,
    NavMenu,
    NavBtn,
    NavBtnLink
} from './NavbarElements';

const Navbar = () => {
    return (
        <div>
            <Nav>
                <NavLink to="/">
                    <h1>Rentable</h1>
                </NavLink>
                <Bars />
                <NavMenu>
                    <NavLink to='/About' activeStyle>
                        About
                    </NavLink>
                    <NavLink to='/Services' activeStyle>
                        Services
                    </NavLink>
                    <NavLink to='/Contact-us' activeStyle>
                        Contact Us
                    </NavLink>
                    <NavLink to='/signup' activeStyle>
                        Sign Up
                    </NavLink>
                </NavMenu>
                <NavBtn>
                    <NavBtnLink to='/signin'>Sign In</NavBtnLink>
                </NavBtn>
            </Nav>
        </div>
    )
}

export default Navbar
