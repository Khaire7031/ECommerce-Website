import React, { useState } from 'react'
import { Link } from 'react-router-dom';

import logo from '../assets/images/logo/logo.png'


export default function NavBar() {

    
    const [menuToggle,setMenuToggle] = useState(false);
    const [socialToggle, setSocialToggle] = useState(false);
    const [headerFixed, setHeaderFixed] = useState(false);

    // Add event Listener
    window.addEventListener('scroll',()=>{
        if(window.scrollY>200){
            setHeaderFixed(true);
        }else{
            setHeaderFixed(false);
        }
    });
  return (
    <header className={`header-section style-4 ${headerFixed ? 'header-fixed fadeInUp':''}`}>
        {/* Header Top */}
        <div className={`header-top ${socialToggle ? 'open' : ''}`}>
            <div className='container'>
                <div className='header-top-area'>
                    <Link to="/signup" className='lab-btn ma-3'><span>Create Account</span></Link>
                    <Link to="/login"><span>Log In</span></Link>
                </div>
            </div>
        </div>

        {/* Header Bottom */}
        <div className='header-bottom'>
            <div className="container">
                <div className='header-wrapper'>
                    {/* Logo */}
                    <div className='logo-search-acte'> 
                        <div className='logo'>
                            <Link to={"/"}>
                                <img src={logo} alt="Logo" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>
  )
}
