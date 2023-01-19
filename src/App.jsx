import { useState } from 'react'
import data from '../assets/data'
import './App.css'
import Pad from './components/Pad'


function App() {

  return (
    <div className='App'>
      <div className='drumpad'>
        <div className='pads-container'>
          {data.map(pad => 
            <Pad key={pad.name} padData={pad}/>
          )}
        </div>
      </div>
      <div className='controls'></div>
    </div>
  )
}

export default App
