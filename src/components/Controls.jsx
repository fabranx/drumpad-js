import { useState } from "react"

function Controls({mediaRecorder}){

  const [canRecord, setCanRecord] = useState(true)
  const [canPlayRecord, setCanPlayRecord] = useState(false)
  const [audioSource, setAudioSource] = useState(null)

  const chunks = [];

  mediaRecorder.ondataavailable = (evt) => {
    // Push each chunk (blobs) in an array
    chunks.push(evt.data);
  };

  mediaRecorder.onstop = (evt) => {
    // Make blob out of our blobs, and open it.
    console.info(chunks)
    const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
    setAudioSource(URL.createObjectURL(blob))
  };


  function startRecording(){
    mediaRecorder.start()
    setCanRecord(false)
    setCanPlayRecord(false)
  }

  function stopRecording(){
    mediaRecorder.stop()
    setCanPlayRecord(true)
    setCanRecord(true)
  }

  function playRecord(){
    let audio = new Audio(audioSource)
    audio.play()
  }

  function deleteRecord(){
    console.log(chunks)
  }

  return(
    <div className="controls">
      <div className="controls-wrapper">
        <button id='record' 
          disabled={!canRecord} 
          className={canRecord ? 'controls-button enabled' : 'controls-button disabled'}
          onClick={startRecording}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" fill="currentColor" /><path fillRule="evenodd" clipRule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12Z" fill="currentColor" /></svg>
        </button>
        
        <button id='stop' 
          disabled={canRecord} 
          className={!canRecord ? 'controls-button enabled' : 'controls-button disabled'} 
          onClick={stopRecording}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 9H9V15H15V9Z" fill="currentColor" /><path fillRule="evenodd" clipRule="evenodd" d="M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12ZM21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" fill="currentColor" /></svg>
        </button>
        
        <button id='play' 
          disabled={!canPlayRecord} 
          className={canPlayRecord ? 'controls-button enabled' : 'controls-button disabled'}
          onClick={playRecord}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21ZM12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23Z" fill="currentColor" /><path d="M16 12L10 16.3301V7.66987L16 12Z" fill="currentColor" /></svg>
        </button>
        
        <button id='delete' 
          disabled={!canPlayRecord} 
          className={canPlayRecord ? 'controls-button enabled' : 'controls-button disabled'}
          onClick={deleteRecord}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M17 6V5C17 3.89543 16.1046 3 15 3H9C7.89543 3 7 3.89543 7 5V6H4C3.44772 6 3 6.44772 3 7C3 7.55228 3.44772 8 4 8H5V19C5 20.6569 6.34315 22 8 22H16C17.6569 22 19 20.6569 19 19V8H20C20.5523 8 21 7.55228 21 7C21 6.44772 20.5523 6 20 6H17ZM15 5H9V6H15V5ZM17 8H7V19C7 19.5523 7.44772 20 8 20H16C16.5523 20 17 19.5523 17 19V8Z" fill="currentColor" /></svg>
        </button>
      </div>
      {canPlayRecord ? 
        // <audio controls src={audioSource}></audio> 
        null
        :
        <p>no record yet</p>        
      }
    </div>
  )
}


export default Controls