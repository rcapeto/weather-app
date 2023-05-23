export interface GetAPIRouteParams {
  latitude: number
  longitude: number
  location?: string
}

export function getApiCurrentWeatherEndpoint({
  latitude,
  longitude,
  location,
}: GetAPIRouteParams) {
  const apiKey = process.env.NEXT_PUBLIC_WEATHER_API
  const uri = new URL('https://api.openweathermap.org/data/2.5/weather')

  if (!apiKey) {
    return ''
  }

  if (location) {
    uri.searchParams.set('q', location)
  } else {
    uri.searchParams.set('lat', latitude.toString())
    uri.searchParams.set('lon', longitude.toString())
  }

  uri.searchParams.set('appid', apiKey)
  uri.searchParams.set('units', 'metric')
  uri.searchParams.set('lang', 'pt_br')

  return uri.toString()
}
