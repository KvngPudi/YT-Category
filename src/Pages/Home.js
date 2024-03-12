import '../App.css'
import React from 'react';
import HeroSection from '../components/HeroSection';
import Search from '../components/Search';
import Login from '../components/login';
import ApiService from '../components/apiService';

function Home(){
    return(
        <>
        <HeroSection />
        <ApiService />
        </>
    )
}

export default Home;