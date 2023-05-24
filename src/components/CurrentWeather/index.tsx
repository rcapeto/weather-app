'use client'
import { useMemo } from 'react'

import { useCurrentLocation } from '@/hooks/useCurrentLocation'
import { useApi } from '@/hooks/useApi'
import { useApiEndpoint } from '@/hooks/useApiEndpoint'

import ConditionRender from '@/components/RenderValidation'
import { Loader } from './Loader'
import { Content } from './Content'
import { Error } from './ErrorPage'

import { ResponseAPICurrentWeatherData } from '@/interfaces/api'

export function CurrentWeather() {
  const { coords, loadingCoords, errorCoords } = useCurrentLocation()

  const { getApiCurrentWeatherEndpoint } = useApiEndpoint()

  const endpoint = useMemo(() => {
    if (!coords) {
      return ''
    }

    return getApiCurrentWeatherEndpoint(coords)
  }, [coords, getApiCurrentWeatherEndpoint])

  const { isLoading, data, isError } =
    useApi<ResponseAPICurrentWeatherData>(endpoint)

  return (
    <ConditionRender
      validation={isLoading || loadingCoords}
      validComponent={<Loader />}
      unvalidComponent={
        <ConditionRender
          validation={isError || !data || !!errorCoords || !data.main}
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
          validComponent={<Error />}
        />
      }
    />
  )
}
