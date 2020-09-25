import React, { useEffect, useMemo, useState } from 'react'

import { SoundsContext } from "./Sounds.context"

export function SoundsProvider({ children }) {
  const [rawSounds, setRawSounds] = useState([])
  const [rawCharacters, setRawCharacters] = useState([])

  useEffect(() => {
    fetch('sounds/sounds.json')
      .then(res => res.json())
      .then(setRawSounds)
      .catch(console.error)
  }, [])

  useEffect(() => {
    fetch('characters/characters.json')
      .then(res => res.json())
      .then(setRawCharacters)
      .catch(console.error)
  }, [])

  const value = useMemo(() => {
    const sounds = rawSounds.map(extendSound).sort((sound1, sound2) => sound1.title.localeCompare(sound2.title))
    const characters = Array.from(new Set(sounds.flatMap(sound => sound.characters))).sort().map(character => rawCharacters.find(rawCharacter => rawCharacter.name === character) ?? { name: character })
    const episodes = Array.from(new Map(sounds.map(sound => [sound.episode.key, sound.episode])).values()).sort((episode1, episode2) => episode1.key.localeCompare(episode2.key))
    const booksMap = new Map(episodes.map(episode => [episode.book, { title: episode.book, episodes: [] }]))
    const books = Array.from(booksMap.values()).sort((book1, book2) => book1.title.localeCompare(book2.title))
    episodes.forEach(episode => booksMap.get(episode.book).episodes.push(episode))

    return {
      sounds,
      characters,
      episodes,
      books,
    }
  }, [rawCharacters, rawSounds])

  return (
    <SoundsContext.Provider value={value}>
      {children}
    </SoundsContext.Provider>
  )
}

function extendSound(sound) {
  const parsedEpisode = /^(Livre (\w+)),? ((\d+) - .+)$/.exec(sound.episode)
  const episode = parsedEpisode
    ? { key: `${parsedEpisode[2]}_${parsedEpisode[4]}`, book: parsedEpisode[1], title: parsedEpisode[3] }
    : { key: sound.episode, book: sound.episode, title: sound.episode }

  return {
    ...sound,
    characters: sound.character.split(' - '),
    episode,
  }
}
