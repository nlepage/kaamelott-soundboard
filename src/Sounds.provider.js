import React, { useEffect, useMemo, useState } from 'react'

import { SoundsContext } from "./Sounds.context"

export function SoundsProvider({ children }) {
  const [rawSounds, setRawSounds] = useState([])

  useEffect(() => {
    fetch('sounds/sounds.json')
      .then(res => res.json())
      .then(setRawSounds)
      .catch(console.error)
  }, [])

  const value = useMemo(() => {
    const sounds = rawSounds.map(extendSound).sort((sound1, sound2) => sound1.title.localeCompare(sound2.title))
    const characters = Array.from(new Set(sounds.flatMap(sound => sound.characters))).sort()

    return {
      sounds,
      characters,
    }
  }, [rawSounds])

  return (
    <SoundsContext.Provider value={value}>
      {children}
    </SoundsContext.Provider>
  )
}

function extendSound(sound) {
  return {
    ...sound,
    characters: sound.character.split(' - '),
  }
}
