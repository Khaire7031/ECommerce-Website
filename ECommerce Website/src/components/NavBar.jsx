import React, { useState } from "react";
import { Link } from "react-router-dom";

import logo from "../assets/images/logo/logo.png";

export default function NavBar() {
    const [menuToggle, setMenuToggle] = useState(false);
    const [socialToggle, setSocialToggle] = useState(false);
    const [headerFixed, setHeaderFixed] = useState(false);

    // Add event Listener
    window.addEventListener("scroll", () => {
        if (window.scrollY > 200) {
            setHeaderFixed(true);
        } else {
            setHeaderFixed(false);
        }
    });
    return (
        <header
            className={`header-section style-4 ${headerFixed ? "header-fixed fadeInUp" : ""
                }`}
        >
            {/* Header Top */}
            <div className={`header-top d-md-none ${socialToggle ? "open" : ""}`}>
                <div className="container">
                    <div className="header-top-area">
                        <Link to="/signup" className="lab-btn ma-3">
                            <span>Create Account</span>
                        </Link>
                        <Link to="/login">
                            <span>Log In</span>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Header Bottom */}
            <div className="header-bottom">
                <div className="container">
                    <div className="header-wrapper">
                        {/* Logo */}
                        <div className="logo-search-acte">
                            <div className="logo">
                                <Link to={"/"}>
                                    <img src={logo} alt="Logo" />
                                </Link>
                            </div>
                        </div>

                        {/* Menu Area */}
                        <div className="menu-area">
                            <div className="menu">
                                <ul className={`lab-ul ${menuToggle ? "active" : ""}`}>
                                    <li>
                                        <Link to="/">Home</Link>
                                    </li>
                                    <li>
                                        <Link to="/shop">Shop</Link>
                                    </li>
                                    <li>
                                        <Link to="/blog">Blog</Link>
                                    </li>
                                    <li>
                                        <Link to="/about">About</Link>
                                    </li>
                                    <li>
                                        <Link to="/contact">Contact</Link>
                                    </li>
                                </ul>
                            </div>
                            {/* Sign IN Log IN */}
                            <Link to="/sign-up" className="lab-btn me-3 d-none d-md-block">
                                Create Account
                            </Link>
                            <Link to="/login" className="d-none d-md-block">
                                Login
                            </Link>

                            {/* Menu Toggerl */}
                            <div onClick={() => setMenuToggle(!menuToggle)} className={`header-bar d-lg-none ${menuToggle ? "active" : ""}`}>
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>

                            {/* Scocial Toggerar */}
                            <div onClick={() => setSocialToggle(!socialToggle)} className="ellepsis-bar d-md-none">
                                <i className="fa-solid fa-circle-info"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
