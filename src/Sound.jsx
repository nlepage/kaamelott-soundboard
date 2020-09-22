import React from 'react'

import { useAudio } from './Sound.hooks'

export function Sound({ file, title }) {
  const { playPause } = useAudio(file)
  
  return <button onClick={playPause}>{title}</button>
}
