import React from 'react'

import { useAudio } from './Sound.hooks'

export function Sound({ file, title }) {
  const { onClick, className } = useAudio(file)
  
  return <button onClick={onClick} className={className}>{title}</button>
}
