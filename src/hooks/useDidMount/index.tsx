import { useEffect, useRef } from 'react'

export function useDidMount(func: () => void) {
  const isMount = useRef(false)

  useEffect(() => {
    if (!isMount.current) {
      isMount.current = true
      func()
    }
  })
}
