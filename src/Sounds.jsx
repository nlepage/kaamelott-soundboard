import React, { useMemo, useState } from 'react'
import { Sound } from './Sound'

import { useBooks, useCharacters, useSounds } from './Sounds.hooks'

export function Sounds() {
  const characters = useCharacters()
  const sounds = useSounds()
  const books = useBooks()

  const [characterFilter, setCharacterFilter] = useState()
  const [episodeFilter, setEpisodeFilter] = useState()

  const filteredSounds = useMemo(() => sounds.filter(sound => {
    if (characterFilter && !sound.characters.includes(characterFilter)) return false
    if (episodeFilter && !(sound.episode.key === episodeFilter)) return false
    return true
  }), [episodeFilter, characterFilter, sounds])
  
  return (
    <>
      <div>
        <select onChange={e => setCharacterFilter(e.target.value)}>
          <option></option>
          {characters.map(character => <option key={character} value={character}>{character}</option>)}
        </select>
        <select onChange={e => setEpisodeFilter(e.target.value)}>
          <option></option>
          {books.map(book => (
            <optgroup key={book.title} label={book.title}>
              {book.episodes.map(episode => <option key={episode.key} value={episode.key}>{episode.title}</option>)}
            </optgroup>
          ))}
        </select>
      </div>
      <div>
        {filteredSounds.map(sound => <Sound key={sound.file} {...sound}/>)}
      </div>
    </>
  )
}
