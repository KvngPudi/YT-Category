import './apiService.css'
import React, {useEffect, useState} from 'react';
import { gapi } from 'gapi-script';
const OAuth2Data = require('../credentials1.json');
const client_ID = OAuth2Data.web.client_id;


const ApiService = () => {
    const [yes, setYes] = useState();

    useEffect(() => {
        fetch('http://localhost:5000/getTranscript', {
    method: 'GET',
    credentials: 'include',
  }).then((response) => {
    if (!response.ok){
        console.log("There is no data")
    }
    return response.json();
  })
  .then((data) => {
    console.log(data)
    setYes(data)
  })
    }, [])


   return ( <div className='text'>
   Here is a random number: 123
</div>);
  
}


export default ApiService


