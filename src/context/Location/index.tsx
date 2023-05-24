'use-client'

import { PropsWithChildren, createContext, useCallback, useState } from 'react'

import { useDidMount } from '@/hooks/useDidMount'
import { Coordinates, ErrorState } from '@/hooks/useCurrentLocation/types'
import { useModal } from '@/hooks/useModal'

import { LocationContextValues } from './types'

export const LocationContext = createContext({} as LocationContextValues)

export default function LocationContextProvider({
  children,
}: PropsWithChildren) {
  const [loadingCoords, setLoadingCoords] = useState(true)
  const [errorCoords, setErrorCoords] = useState<ErrorState | null>(null)
  const [coords, setCoords] = useState<Coordinates | null>(null)

  const { showModal, closeModal } = useModal()

  const onErrorGetCoordinate = useCallback(
    (errorState: ErrorState) => {
      setErrorCoords(errorState)
      setLoadingCoords(false)

      showModal({
        description: errorState.hasDenied
          ? 'Você precisa aceitar o acesso a sua localização'
          : 'Ocorreu um erro, por favor tente novamente! ',
        title: 'Erro em obter localização',
        onPress: closeModal,
        buttonText: 'Ok',
      })
    },
    [showModal, closeModal],
  )

  const getCurrentLocation = useCallback(() => {
    navigator.geolocation.getCurrentPosition(
      (response) => {
        setCoords(response.coords)
        setLoadingCoords(false)
      },
      (err) => {
        const code = err.code
        const errorState = {
          hasDenied: code === err.PERMISSION_DENIED,
          isTimeout: code === err.TIMEOUT,
          positionIsUnavailable: code === err.POSITION_UNAVAILABLE,
        }

        setLoadingCoords(false)
        onErrorGetCoordinate(errorState)
      },
    )
  }, [onErrorGetCoordinate])

  useDidMount(() => {
    getCurrentLocation()
  })
  return (
    <LocationContext.Provider
      value={{
        coords,
        errorCoords,
        loadingCoords,
      }}
    >
      {children}
    </LocationContext.Provider>
  )
}
