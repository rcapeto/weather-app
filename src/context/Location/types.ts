import { Coordinates, ErrorState } from '@/hooks/useCurrentLocation/types'

export interface LocationContextValues {
  loadingCoords: boolean
  coords: Coordinates | null
  errorCoords: ErrorState | null
}
