'use client'
import { useMemo, useState } from 'react'

import { useCurrentLocation } from '@/hooks/useCurrentLocation'
import { useApi } from '@/hooks/useApi'
import { useApiEndpoint } from '@/hooks/useApiEndpoint'
import { APICurrentWeatherData } from '@/interfaces/api'
import ConditionRender from '@/components/RenderValidation'

import { Loader } from './Loader'
import { Content } from './Content'
import { ErrorPage } from './ErrorPage'
import { Coordinates, ErrorState } from '@/hooks/useCurrentLocation/types'
import { useModal } from '@/hooks/useModal'

export function CurrentWeather() {
  const [loadingCoords, setLoadingCoords] = useState(true)
  const [errorCoords, setErrorCoords] = useState(false)
  const [coords, setCoords] = useState<Coordinates>()

  const { showModal, closeModal } = useModal()

  useCurrentLocation({
    onError: onErrorGetCoordinate,
    onSuccess: onSuccessGetCoordinate,
  })

  const { getApiCurrentWeatherEndpoint } = useApiEndpoint()

  const endpoint = useMemo(() => {
    if (!coords) {
      return ''
    }

    return getApiCurrentWeatherEndpoint(coords)
  }, [coords, getApiCurrentWeatherEndpoint])

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

  const { isLoading, data, isError } = useApi<APICurrentWeatherData>(endpoint)

  return (
    <ConditionRender
      validation={isLoading || loadingCoords}
      validComponent={<Loader />}
      unvalidComponent={
        <ConditionRender
          validation={isError || !data || errorCoords || !data.main}
          unvalidComponent={
            <Content
              cityName={data?.name}
              country={data?.sys?.country}
              temp={data?.main?.temp}
              feelsLike={data?.main?.feels_like}
              temp_max={data?.main?.temp_max}
              temp_min={data?.main?.temp_min}
              sunrise={data?.sys?.sunrise}
              sunset={data?.sys?.sunset}
              weatherDescription={data?.weather?.[0].description}
              weatherIcon={data?.weather?.[0].icon}
              windSpeed={data?.wind?.speed}
              umidity={data?.main?.humidity}
            />
          }
          validComponent={<ErrorPage />}
        />
      }
    />
  )
}
