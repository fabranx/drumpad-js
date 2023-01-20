import { useState } from 'react'
import data from './data'
import './App.css'
import Pad from './components/Pad'
import Controls from './components/Controls'


function App() {

  let audioCtx = new AudioContext()

  async function loadFile(filePath) {
    const track = await getFile(filePath);
    return track;
  }

  async function getFile(filepath) {
    const response = await fetch(filepath);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
    return audioBuffer;
  }

  return (
    <div className='App'>
      <div className='drumpad'>
        <div className='pads-container'>
          {data.map(pad => 
            <Pad key={pad.name} padData={pad} audioContext={audioCtx} loadFile={loadFile}/>
          )}
        </div>
      </div>
      <Controls />
    </div>
  )
}

export default App
