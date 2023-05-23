'use client'

import {
  MapPin,
  Droplets,
  Wind,
  Sunset,
  Sunrise,
  Thermometer,
} from 'lucide-react'

import { SectionTitle } from '@/components/SectionTitle'
import { Mapper } from '@/components/Mapper'

import { colors } from '@/config/colors'
import { format } from '@/utils/format'
import { getImage } from '@/utils/getImage'

import styles from './styles.module.css'

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
          src={getImage('country', props.country ?? '')}
          alt={props.cityName ?? ''}
        />
      </div>

      <div className={styles.tempContainer}>
        <Mapper
          items={[
            { text: 'Mín', value: format('temperature', props.temp_min ?? 0) },
            { text: 'Atual', value: format('temperature', props.temp ?? 0) },
            { text: 'Máx', value: format('temperature', props.temp_max ?? 0) },
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

      <div className={styles.informationsContainer}>
        <div className={styles.weatherContent}>
          <img
            src={getImage('climate', props?.weatherIcon ?? '')}
            alt={props?.weatherDescription ?? ''}
          />
          <p>{props?.weatherDescription}</p>
        </div>

        <div className={styles.informations}>
          <Mapper
            items={[
              {
                Icon: Thermometer,
                value: format('temperature', props?.feelsLike ?? 0),
              },
              {
                Icon: Wind,
                value: format('speed', props?.windSpeed ?? 0),
              },
              {
                Icon: Droplets,
                value: format('humidity', props?.umidity ?? 0),
              },
              {
                Icon: Sunrise,
                value: format('timezone', props?.sunrise ?? 0),
              },
              {
                Icon: Sunset,
                value: format('timezone', props?.sunset ?? 0),
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
    </div>
  )
}
