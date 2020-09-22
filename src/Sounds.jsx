import React from 'react'
import { Sound } from './Sound'

import { useSounds } from './Sounds.hooks'

export function Sounds() {
  const sounds = useSounds()
  
  return sounds.map(sound => <Sound key={sound.file} {...sound}/>)
}

