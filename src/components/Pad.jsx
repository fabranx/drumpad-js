
const colors = {
  'clap': 'cyan',
  'hi-hat': 'yellow',
  'cowbell': 'purple',
  'crash': 'green',
  'low': 'blue',
  'kick': 'orange'
}

const src='../../assets/sounds/'

function Pad({padData}){

  const audio = new Audio(`${src}${padData.name}.webm`)

  function playSound(){
    audio.play()
  }


  return(
    <div className='pad' style={{backgroundColor: colors[padData.type]}} onClick={playSound}>
      <p>{padData.type}</p>
    </div>
  )
}


export default Pad