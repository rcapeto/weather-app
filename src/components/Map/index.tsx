'use client'

import { useState } from 'react'

import { Coordinates, ErrorState } from '@/hooks/useCurrentLocation/types'
import { useCurrentLocation } from '@/hooks/useCurrentLocation'
import { useModal } from '@/hooks/useModal'

import ConditionRender from '@/components/RenderValidation'
import { Loader } from './Loader'
import { Error } from './ErrorPage'
import { Content } from './Content'

export function Map() {
  const [coords, setCoords] = useState<Coordinates>()
  const [loadingCoords, setLoadingCoords] = useState(true)
  const [errorCoords, setErrorCoords] = useState(false)

  const { closeModal, showModal } = useModal()

  useCurrentLocation({
    onError: onErrorGetCoordinate,
    onSuccess: onSuccessGetCoordinate,
  })

  function onErrorGetCoordinate(errorState: ErrorState) {
    setErrorCoords(true)
    setLoadingCoords(false)

    showModal({
      description: errorState.hasDenied
        ? 'Você precisa aceitar o acesso a sua localização'
        : 'Ocorreu um erro, por favor tente novamente! ',
      title: 'Erro em obter localização',
      onPress: closeModal,
      buttonText: 'Ok',
    })
  }

  function onSuccessGetCoordinate(coordinates: Coordinates) {
    setCoords(coordinates)
    setLoadingCoords(false)
  }

  return (
    <ConditionRender
      validation={loadingCoords}
      validComponent={<Loader />}
      unvalidComponent={
        <ConditionRender
          validation={errorCoords}
          validComponent={<Error />}
          unvalidComponent={<Content coords={coords} />}
        />
      }
    />
  )
}
