import { getCountryFlag } from '@/services/api-get-country-flag'
import { getImageEndpoint } from '@/services/api-get-icons'
import { getApiCurrentWeatherEndpoint } from '@/services/api-routes'

export function useApiEndpoint() {
  return {
    getImageEndpoint,
    getApiCurrentWeatherEndpoint,
    getCountryFlag,
  }
}
