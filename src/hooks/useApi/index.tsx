'use client'
import { useCallback, useEffect, useMemo, useState } from 'react'

export function useApi<Data>(endpoint: string, config?: RequestInit) {
  const [data, setData] = useState<Data>()
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  const fetchData = useCallback(async () => {
    if (!endpoint) {
      return
    }
    setIsLoading(true)

    try {
      const response = await fetch(endpoint, config)
      const json: Data = await response.json()

      setData(json)
    } catch (err) {
      console.log(`[API-Error] >> ${endpoint}`, {
        message: (err as Error).message,
      })
      setIsError(true)
    } finally {
      setIsLoading(false)
    }
  }, [endpoint, config])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return useMemo(
    () => ({
      data,
      isLoading,
      isError,
    }),
    [data, isError, isLoading],
  )
}
