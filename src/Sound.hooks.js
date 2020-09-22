import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import Rythm from 'rythm.js'

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
      rythm.current.addRythm(rythmClassName, 'pulse', 150, 40)
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
