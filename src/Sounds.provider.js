import React, { useEffect, useMemo, useState } from 'react'

import { SoundsContext } from "./Sounds.context"

export function SoundsProvider({ children }) {
  const [sounds, setSounds] = useState([])

  useEffect(() => {
    fetch('/sounds/sounds.json')
      .then(res => res.json())
      .then(setSounds)
      .catch(console.error)
  }, [])
  
  const value = useMemo(() => {
    return {
      sounds,
    }
  },[sounds])

  return (
    <SoundsContext.Provider value={value}>
      {children}
    </SoundsContext.Provider>
  )
}