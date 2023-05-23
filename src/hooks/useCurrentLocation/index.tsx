import { useContext } from 'react'

import { LocationContext } from '@/context/Location'

export function useCurrentLocation() {
  return useContext(LocationContext)
}
