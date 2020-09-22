import React, { useMemo, useState } from 'react'
import { Sound } from './Sound'

import { useCharacters, useSounds } from './Sounds.hooks'

export function Sounds() {
  const characters = useCharacters()
  const sounds = useSounds()

  const [characterFilter, setCharacterFilter] = useState()

  const filteredSounds = useMemo(() => {
    if (!characterFilter) return sounds
    return sounds.filter(sound => sound.characters.includes(characterFilter))
  }, [characterFilter, sounds])
  
  return (
    <>
      <div>
        <select onChange={e => setCharacterFilter(e.target.value)}>
          <option></option>
          {characters.map(character => <option key={character} value={character}>{character}</option>)}
        </select>
      </div>
      <div>
        {filteredSounds.map(sound => <Sound key={sound.file} {...sound}/>)}
      </div>
    </>
  )
}

