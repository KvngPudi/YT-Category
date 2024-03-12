
import React, {useState} from 'react'
import './Search.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
function Search() {
  const [input, setInput] = useState("");
  const [submittedValue, setSubmittedValue] = useState("");

  const handleKeyDown = (event) => {
    if (event.key === 'Enter'){
  
      console.log(input);
      setInput('')
      event.preventDefault();

  
    }
  }
  return (
    <div className='search-container'>
        <FontAwesomeIcon icon={faSearch} className='icon-wrapper' /> 
        <input type="text" placeholder='paste your link!' value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleKeyDown} />
    </div>
  )
}

export default Search
