import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import Rythm from 'rythm.js'

import { useCharacters } from "./Sounds.hooks"

export function useAudio(file) {
  const audio = useMemo(() => new Audio(`sounds/${file}`), [file])
  const rythm = useRef()
  const [playing, setPlaying] = useState(false)

  const rythmClassName = `rythm-${file.replace(/\./g, '-')}`

  const onPlay = useCallback(() => {
    setPlaying(true)
    if (!rythm.current) {
      rythm.current = new Rythm()
      rythm.current.connectExternalAudioElement(audio)
      rythm.current.addRythm(rythmClassName, 'pulse', 150, 40, { min: 1, max: 1.5 })
    }
    rythm.current.start()
  }, [audio, rythmClassName])

  const onEnded = useCallback(() => {
    setPlaying(false)
    rythm.current.stop()
  }, [])
  
  useEffect(() => {
    audio.addEventListener('play', onPlay)
    audio.addEventListener('ended', onEnded)
    return () => {
      audio.removeEventListener('play', onPlay)
      audio.removeEventListener('ended', onEnded)
    }
  }, [audio, onEnded, onPlay])

  const playStop = useCallback(() => {
    if (playing) {
      audio.currentTime = audio.duration
      return
    }
    audio.play()
  }, [audio, playing])

  return {
    rythmClassName,
    playStop,
  }
}

export function useCharacter(name) {
  const characters = useCharacters()

  return useMemo(() => {
    const c = characters.find(character => character.name === name)
    if (!c) console.log(name)
    return c
  }, [characters, name])
}