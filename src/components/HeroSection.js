import React from 'react'
import './HeroSection.css'
import '../App.css'
import Search from './Search'
import Login from './login'

import vid from '../videos/christmas-lights.mp4'

function HeroSection() {
  return (
    <div className='hero-container'>
        <video src={vid} autoPlay loop muted></video>
        <h1>SIMPLICITY AWAITS</h1>
        <div className='search-bar-container'>
          <Search />
        </div>
        <div>
        <Login />
        </div>
    </div>
 
  )
}

export default HeroSection
