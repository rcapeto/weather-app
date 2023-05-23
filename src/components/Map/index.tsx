'use client'

import { useCurrentLocation } from '@/hooks/useCurrentLocation'

import ConditionRender from '@/components/RenderValidation'
import { Loader } from './Loader'
import { Error } from './ErrorPage'
import { Content } from './Content'

export function Map() {
  const { coords, errorCoords, loadingCoords } = useCurrentLocation()

  return (
    <ConditionRender
      validation={loadingCoords}
      validComponent={<Loader />}
      unvalidComponent={
        <ConditionRender
          validation={!!errorCoords}
          validComponent={<Error />}
          unvalidComponent={<Content coords={coords!} />}
        />
      }
    />
  )
}
