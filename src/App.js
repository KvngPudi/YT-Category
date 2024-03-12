import React from 'react'
import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import './App.css'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import HeroSection from './components/HeroSection';
import Home from './Pages/Home';
import Login from './components/login';
import { gapi } from 'gapi-script'
import ApiService from './components/apiService';
const OAuth2Data = require('./credentials1.json');
const client_ID = OAuth2Data.web.client_id;

function App() {

  const [backendData, setBackendData] = useState([{}])

  useEffect(() => {
    fetch("/getTranscript").then(
      response => response.json()
    ).then(
      data => {
        setBackendData(data)
      }
    )
  }, [])

  useEffect(() => {
    function start() {
        gapi.client.init({
            clientId: client_ID,
            scope: ""
        })
    };
    gapi.load('client:auth2', start);
}, [])
  return (
  <>
   <Router>
    <Navbar />
    <Routes>
      <Route path='/' exact Component={Home}/>
    
    
    </Routes>
  </Router> 

  

  </>

  )

    
}



export default App