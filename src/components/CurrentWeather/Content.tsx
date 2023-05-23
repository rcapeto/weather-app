import {
  MapPin,
  Droplets,
  Wind,
  Sunset,
  Sunrise,
  Thermometer,
} from 'lucide-react'

import { SectionTitle } from '@/components/SectionTitle'
import styles from './styles.module.css'
import { colors } from '@/config/colors'
import { useApiEndpoint } from '@/hooks/useApiEndpoint'
import { Mapper } from '@/components/Mapper'

interface ContentProps {
  cityName?: string
  temp?: number
  temp_max?: number
  temp_min?: number
  feelsLike?: number
  country?: string
  sunrise?: number
  sunset?: number
  weatherDescription?: string
  weatherIcon?: string
  windSpeed?: number
  umidity?: number
}

export function Content(props: ContentProps) {
  const { getCountryFlag, getImageEndpoint } = useApiEndpoint()

  function getTemp(temp?: number) {
    const tempFormatted = Math.round(temp ?? 0)
    return `${tempFormatted}ºC`
  }

  function getDate(timezone: number) {
    const date = new Date(timezone * 1000)
    const hours = date.getHours().toString()
    const minutes = date.getMinutes().toString()

    return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`
  }

  return (
    <div className={styles.container}>
      <SectionTitle
        text="Sua localização"
        className={styles.sectionContainer}
      />

      <div className={styles.locationContainer}>
        <MapPin color={colors.gray[100]} size={15} />

        <span>{props.cityName}</span>
        <img
          src={getCountryFlag(props.country ?? '')}
          alt={props.cityName ?? ''}
        />
      </div>

      <div className={styles.weatherContent}>
        <img
          src={getImageEndpoint(props?.weatherIcon ?? '')}
          alt={props?.weatherDescription ?? ''}
        />
        <p>{props?.weatherDescription}</p>
      </div>

      <div className={styles.tempContainer}>
        <Mapper
          items={[
            { text: 'Mín', value: getTemp(props.temp_min) },
            { text: 'Atual', value: getTemp(props.temp) },
            { text: 'Máx', value: getTemp(props.temp_max) },
          ]}
          renderItem={({ item }) => (
            <div className={styles.temperature}>
              <p>{item.value}</p>
              <span>{item.text}</span>
            </div>
          )}
          keyExtractor={(item) => item.text}
        />
      </div>

      <div className={styles.informations}>
        <Mapper
          items={[
            {
              Icon: Thermometer,
              value: getTemp(props?.feelsLike ?? 0),
            },
            {
              Icon: Wind,
              value: `${props?.windSpeed}km/h`,
            },
            {
              Icon: Droplets,
              value: `${props?.umidity}%`,
            },
            {
              Icon: Sunrise,
              value: getDate(props?.sunrise ?? 0),
            },
            {
              Icon: Sunset,
              value: getDate(props?.sunset ?? 0),
            },
          ]}
          keyExtractor={(item) => `${item.value}`}
          renderItem={({ item: { Icon, value } }) => (
            <div className={styles.information}>
              <Icon color={colors.gray[100]} size={15} />
              <p>{value}</p>
            </div>
          )}
        />
      </div>
    </div>
  )
}
