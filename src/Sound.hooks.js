import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import Rythm from 'rythm.js'

export function useAudio(file) {
  const audio = useMemo(() => new Audio(`sounds/${file}`), [file])
  const rythm = useRef()
  const [playing, setPlaying] = useState(false)

  const onPlay = useCallback(() => {
    setPlaying(true)
    if (!rythm.current) {
      rythm.current = new Rythm()
      rythm.current.connectExternalAudioElement(audio)
    }
    rythm.current.start()
  }, [audio])

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

  const onClick = useCallback(() => {
    if (playing) {
      audio.currentTime = audio.duration
      return
    }
    audio.play()
  }, [audio, playing])

  return {
    className: playing ? 'rythm-medium' : null,
    onClick,
  }
}