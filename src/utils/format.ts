type FormatType = 'temperature' | 'timezone' | 'speed' | 'humidity'

export function format(type: FormatType, data: number) {
  switch (type) {
    case 'temperature':
      const tempFormatted = Math.round(data)
      return `${tempFormatted}ºC`
    case 'timezone':
      const date = new Date(data * 1000)
      const hours = date.getHours().toString()
      const minutes = date.getMinutes().toString()

      return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`
    case 'speed':
      return `${data}km/h`
    case 'humidity':
      return `${data}%`
    default:
      return ''
  }
}
