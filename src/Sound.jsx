import React from 'react'

import { useAudio } from './Sound.hooks'

export function Sound({ file, title }) {
  const { playStop, rythmClassName } = useAudio(file)
  
  return <button onClick={playStop} className={rythmClassName}>{title}</button>
}
