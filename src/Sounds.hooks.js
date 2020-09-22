import { useContext } from "react"

import { SoundsContext } from "./Sounds.context"

export function useSounds() {
  return useContext(SoundsContext).sounds
}

export function useCharacters() {
  return useContext(SoundsContext).characters
}

export function useBooks() {
  return useContext(SoundsContext).books
}
