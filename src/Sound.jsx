import React from 'react'

import { useAudio, useCharacter } from './Sound.hooks'
import './Sound.css'

export function Sound({ file, title , characters }) {
  const { playStop, rythmClassName } = useAudio(file)
  const character = useCharacter(characters[0])
  
  return (
    <button onClick={playStop} className="sound">
      {character.file && <img src={`characters/${character.file}`} alt="Personnage" className={rythmClassName} height="50" />}
      {title}
    </button>
  )
}
