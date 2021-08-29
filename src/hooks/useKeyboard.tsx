import { useState } from 'react'
import { useEffect } from 'react'

export const useKeyboard = (): string | null => {
  const [key, setKey] = useState<string | null>(null)

  useEffect(() => {
    const setPressedKey = (ev: KeyboardEvent): void => {
      setKey(ev.key)
    }
    window.addEventListener('keydown', setPressedKey)

    return () => window.removeEventListener('keydown', setPressedKey)
  }, [])

  return key
}
