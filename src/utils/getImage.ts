import { useApiEndpoint } from '@/hooks/useApiEndpoint'

type GetImageType = 'country' | 'climate'

export function getImage(type: GetImageType, data: string) {
  const { getCountryFlag, getImageEndpoint } = useApiEndpoint()
  const handler = type === 'country' ? getCountryFlag : getImageEndpoint

  return handler(data)
}
