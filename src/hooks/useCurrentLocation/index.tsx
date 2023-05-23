'use client'

import { useCallback } from 'react'
import { UseCurrentLocationParams } from './types'
import { useDidMount } from '@/hooks/useDidMount'

export function useCurrentLocation(params?: UseCurrentLocationParams) {
  const getCurrentLocation = useCallback(() => {
    navigator.geolocation.getCurrentPosition(
      (response) => {
        const { coords } = response
        params?.onSuccess?.({
          latitude: coords.latitude,
          longitude: coords.longitude,
        })
      },
      (err) => {
        const code = err.code
        const errorState = {
          hasDenied: code === err.PERMISSION_DENIED,
          isTimeout: code === err.TIMEOUT,
          positionIsUnavailable: code === err.POSITION_UNAVAILABLE,
        }

        params?.onError?.(errorState)
        // setIsError(true)
      },
    )
  }, [params])

  useDidMount(() => {
    getCurrentLocation()
  })
}
