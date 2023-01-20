import { useEffect, useState } from "react"


const colors = {
  'clap': 'cyan',
  'hi-hat': 'yellow',
  'cowbell': 'purple',
  'crash': 'green',
  'low': 'blue',
  'kick': 'orange'
}

const src='assets/sounds/'

function Pad({padData, audioContext, loadFile}){

  const [sound, setSound] = useState(null)


  function playSound(){
    const trackSource = new AudioBufferSourceNode(audioContext, {
      buffer: sound,
    });

    trackSource.connect(audioContext.destination);
    trackSource.start();
    return trackSource;
  }

  useEffect(() => {
    loadFile(`${src}${padData.name}.webm`)
    .then((track) => setSound(track))
  }, [])


  return(
      <div className='pad' style={{backgroundColor: colors[padData.type]}} onClick={playSound}>
        <p>{padData.type}</p>
      </div>
  )
}


export default Pad