import { useState } from 'react'
import { useEffect } from 'react'

export const useKeyboard = (): [string | null, boolean] => {
  const [key, setKey] = useState<string | null>(null)
  const [isKeyPressed, setIsKeyPressed] = useState<boolean>(false)

  useEffect(() => {
    const onKeyDown = (ev: KeyboardEvent): void => {
      setIsKeyPressed(false)
      setKey(ev.key)
    }
    const onKeyUp = () => {
      setIsKeyPressed(true)
    }
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)

    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
    }
  }, [])

  return [key, isKeyPressed]
}
