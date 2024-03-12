import React from "react";
import { useState } from "react";
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faL, faLayerGroup, faList } from '@fortawesome/free-solid-svg-icons'
import './Navbar.css';

function Navbar(){
    return(
        <>
        <nav className="navbar">
            <div className="navbar-container">
            <Link to='/' className="navbar-text">
                YT-Categorizer<FontAwesomeIcon icon={faLayerGroup} className="navbar-logo" />
                </Link>
                
            </div>
        </nav>    
        </>
    )
}

export default Navbar;