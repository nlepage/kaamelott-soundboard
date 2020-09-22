import { useMemo, useState } from "react"

export function useAudio(file) {
  const audio = useMemo(() => new Audio(`/sounds/${file}`), [file])
  const [playing, setPlaying] = useState(false)
  
  audio.addEventListener('play', () => setPlaying(true))
  audio.addEventListener('ended', () => setPlaying(false))
  
  return {
    playPause() {
      if (playing) {
        audio.currentTime = audio.duration
        return
      }
  
      audio.play()
    }
  }
}