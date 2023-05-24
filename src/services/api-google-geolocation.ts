interface Params {
  address: string
}

export function getApiGoogleGeolocation({ address }: Params) {
  const uri = new URL('https://maps.googleapis.com/maps/api/geocode/json')

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_SECRET_KEY

  uri.searchParams.set('address', address)
  uri.searchParams.set('key', apiKey ?? '')
  uri.searchParams.set('language', 'pt-BR')

  return uri.toString()
}
