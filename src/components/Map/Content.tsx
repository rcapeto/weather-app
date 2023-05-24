'use client'

import { useState, useRef, Fragment } from 'react'
import {
  MapContainer,
  TileLayer,
  useMapEvent,
  Marker,
  Popup,
} from 'react-leaflet'
import { Search, Navigation, Locate } from 'lucide-react'
import Leaflet from 'leaflet'

import { Coordinates } from '@/hooks/useCurrentLocation/types'
import { useApiEndpoint } from '@/hooks/useApiEndpoint'
import { useModal } from '@/hooks/useModal'

import { PopupContent } from './components/PopupContent'
import { Button } from '@/components/Button'
import ConditionRender from '@/components/RenderValidation'
import { Error } from './ErrorPage'

import { ResponseAPIGoogleGeolocation } from '@/interfaces/api'
import { colors } from '@/config/colors'

import styles from './styles.module.css'
import { useHistory } from '@/hooks/useHistory'

interface ContentProps {
  coords?: Coordinates
}

export function Content(props: ContentProps) {
  const [position, setPosition] = useState<Coordinates | null>(
    props.coords ?? null,
  )
  const [loadingCityWeather, setLoadingCityWeather] = useState(false)
  const [currentSearchAddress, setCurrentSearchAddress] = useState<
    string | null
  >(null)

  const inputRef = useRef<HTMLInputElement>(null)
  const currentMap = useRef<Leaflet.Map>(null)

  const { showModal, closeModal } = useModal()
  const { getApiGoogleGeolocation } = useApiEndpoint()
  const { handleAddLocationInHistory } = useHistory()

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

      setCurrentSearchAddress(null)

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

    const address = inputRef.current.value

    try {
      setLoadingCityWeather(true)
      const endpoint = getApiGoogleGeolocation({ address })
      const response = await fetch(endpoint)
      const data: ResponseAPIGoogleGeolocation = await response.json()

      if (data && data.status === 'OK' && data.results.length > 0) {
        const [result] = data.results
        const {
          geometry: { location },
          formatted_address,
        } = result

        updateMap({ latitude: location.lat, longitude: location.lng })

        setCurrentSearchAddress(formatted_address)
        handleAddLocationInHistory(formatted_address)

        inputRef.current.value = ''
      } else {
        handleShowError(address)
        setCurrentSearchAddress(null)
      }
    } catch (err) {
      handleShowError(address)
      setCurrentSearchAddress(null)
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

  function onPressFindMe() {
    if (props?.coords) {
      updateMap(props?.coords)
      setCurrentSearchAddress(null)
    }
  }

  if (!props?.coords) {
    return <Error />
  }

  return (
    <Fragment>
      <ConditionRender
        validation={!!currentSearchAddress}
        validComponent={
          <div className={styles.currentLocationContainer}>
            <div className={styles.currentLocation}>
              <Navigation color={colors.gray[800]} size={16} />
              <p>{currentSearchAddress}</p>
            </div>
          </div>
        }
      />
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

          <div className={styles.buttonLocateMeContainer}>
            <button type="button" onClick={onPressFindMe}>
              <Locate color={colors.purple[600]} size={15} />
            </button>
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
    </Fragment>
  )
}

const mapIcon = Leaflet.icon({
  iconUrl: 'https://p7.hiclipart.com/preview/198/368/58/5bbc422e059eb.jpg',
  iconSize: [20, 20],
  iconAnchor: [10, 10],
})
