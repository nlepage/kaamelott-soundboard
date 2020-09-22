import { useContext } from "react"

import { SoundsContext } from "./Sounds.context"

export function useSounds() {
  return useContext(SoundsContext).sounds
}