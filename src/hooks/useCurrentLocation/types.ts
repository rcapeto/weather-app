export interface ErrorState {
  hasDenied: boolean
  positionIsUnavailable: boolean
  isTimeout: boolean
}

export interface Coordinates {
  latitude: number
  longitude: number
}

export interface UseCurrentLocationParams {
  onError?: (error: ErrorState) => void
  onSuccess?: (coords: Coordinates) => void
}
