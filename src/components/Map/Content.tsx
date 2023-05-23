'use client'

import { useState, useRef } from 'react'
import {
  MapContainer,
  TileLayer,
  useMapEvent,
  Marker,
  Popup,
} from 'react-leaflet'
import { Search } from 'lucide-react'
import Leaflet from 'leaflet'

import { Coordinates } from '@/hooks/useCurrentLocation/types'
import { Button } from '@/components/Button'
import { Error } from './ErrorPage'
import styles from './styles.module.css'
import { colors } from '@/config/colors'
import { PopupContent } from './components/PopupContent'
import { useApiEndpoint } from '@/hooks/useApiEndpoint'
import { useModal } from '@/hooks/useModal'
import { APICurrentWeatherData } from '@/interfaces/api'

interface ContentProps {
  coords?: Coordinates
}

export function Content(props: ContentProps) {
  const [position, setPosition] = useState<Coordinates | null>(null)
  const [loadingCityWeather, setLoadingCityWeather] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)
  const currentMap = useRef<Leaflet.Map>(null)

  const { showModal, closeModal } = useModal()
  const { getApiCurrentWeatherEndpoint } = useApiEndpoint()

  function handleShowError(location: string) {
    showModal({
      buttonText: 'Entendi',
      description: `Houve algum problema em obter dados de: ${location}, por favor tente novamente!`,
      title: 'Ooh, ops! Algo de errado aconteceu!',
      onPress: () => {
        closeModal()

        if (inputRef.current) {
          inputRef.current.value = ''
        }
      },
    })
  }

  function LocationMarker() {
    const map = useMapEvent('click', (event) => {
      map.locate()

      if (inputRef.current) {
        inputRef.current.value = ''
      }

      setPosition({
        latitude: event.latlng.lat,
        longitude: event.latlng.lng,
      })
    })

    return null
  }

  async function handleSearchCityWeather() {
    if (!inputRef.current) {
      return undefined
    }

    const location = inputRef.current.value

    try {
      setLoadingCityWeather(true)
      const endpoint = getApiCurrentWeatherEndpoint({ location })
      const response = await fetch(endpoint)
      const data: APICurrentWeatherData = await response.json()

      if (data && data.coord) {
        updateMap({ latitude: data.coord.lat, longitude: data.coord.lon })
      } else {
        handleShowError(location)
      }
    } catch (err) {
      handleShowError(location)
    } finally {
      setLoadingCityWeather(false)
    }
  }

  function updateMap(coords: Coordinates) {
    setPosition(coords)

    if (currentMap.current) {
      const map = currentMap.current

      map.setView([coords.latitude, coords.longitude])
    }
  }

  if (!props?.coords) {
    return <Error />
  }

  return (
    <div className={styles.mapContainer}>
      <div className={styles.inputContainer}>
        <div className={styles.inputContent}>
          <input
            type="text"
            ref={inputRef}
            placeholder="Digite uma localização"
          />
          <Button
            buttonStyle={styles.button}
            icon={<Search color={colors.gray[100]} size={13} />}
            onPress={handleSearchCityWeather}
            disabled={loadingCityWeather}
          />
        </div>
      </div>
      <MapContainer
        center={[props.coords.latitude, props.coords.longitude]}
        zoom={18}
        ref={currentMap}
        style={{ width: '100%', height: '100%' }}
      >
        <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <LocationMarker />

        {position && (
          <Marker
            position={[position.latitude, position.longitude]}
            icon={mapIcon}
          >
            <Popup maxWidth={200} minWidth={200}>
              <PopupContent position={position} />
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  )
}

const mapIcon = Leaflet.icon({
  iconUrl: 'https://p7.hiclipart.com/preview/198/368/58/5bbc422e059eb.jpg',
  iconSize: [20, 20],
  iconAnchor: [10, 10],
})
