import { useState } from 'react'
import data from './data'
import './App.css'
import Pad from './components/Pad'
import Controls from './components/Controls'


function App() {

  const audioCtx = new AudioContext()

  const mediaStreamDestination = audioCtx.createMediaStreamDestination();

  const mediaRecorder = new MediaRecorder(mediaStreamDestination.stream)

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
            <Pad key={pad.name} padData={pad} audioContext={audioCtx} loadFile={loadFile} mediaDest={mediaStreamDestination}/>
          )}
        </div>
      </div>
      <Controls mediaRecorder={mediaRecorder}/>
    </div>
  )
}

export default App
