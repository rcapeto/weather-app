export interface ResponseAPICurrentWeatherData {
  coord: {
    lat: number
    lon: number
  }
  main: {
    feels_like: number
    temp: number
    temp_max: number
    temp_min: number
    humidity: number
  }
  name: string
  sys: {
    country: string
    sunrise: number
    sunset: number
  }
  weather: {
    description: string
    icon: string
  }[]
  wind: {
    speed: number
  }
}
export interface ResponseAPIGoogleGeolocation {
  status: 'OK' | 'REQUEST_DENIED'
  results: {
    formatted_address: string
    geometry: {
      location: {
        lat: number
        lng: number
      }
    }
  }[]
}
