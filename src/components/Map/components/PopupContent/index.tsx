import {
  MapPin,
  Thermometer,
  Wind,
  Droplets,
  Sunrise,
  Sunset,
} from 'lucide-react'

import { Coordinates } from '@/hooks/useCurrentLocation/types'
import { useApiEndpoint } from '@/hooks/useApiEndpoint'
import { useApi } from '@/hooks/useApi'
import { Mapper } from '@/components/Mapper'
import { Loading } from '@/components/Loading'
import ConditionRender from '@/components/RenderValidation'

import { getImage } from '@/utils/getImage'
import { format } from '@/utils/format'
import { colors } from '@/config/colors'
import { ResponseAPICurrentWeatherData } from '@/interfaces/api'

import styles from './styles.module.css'

interface PopupContentProps {
  position: Coordinates
}

export function PopupContent(props: PopupContentProps) {
  const { getApiCurrentWeatherEndpoint } = useApiEndpoint()
  const endpoint = getApiCurrentWeatherEndpoint(props.position)

  const { data, isError, isLoading } =
    useApi<ResponseAPICurrentWeatherData>(endpoint)

  function renderError() {
    return (
      <div className={styles.errorContent}>
        <span>Ooh! Ops! Ocorreu algum problema em carregar os dados!</span>
      </div>
    )
  }

  return (
    <ConditionRender
      validation={isLoading}
      validComponent={<Loading />}
      unvalidComponent={
        <ConditionRender
          validation={isError || !data || !data.main}
          validComponent={renderError()}
          unvalidComponent={
            <div className={styles.popupContent}>
              <div className={styles.locationContainer}>
                <MapPin color={colors.gray[700]} size={18} />
                <span>{data?.name}</span>
              </div>
              <div className={styles.weatherContent}>
                <img
                  src={getImage('climate', data?.weather?.[0].icon ?? '')}
                  alt={data?.weather?.[0].description}
                />
                <span>{data?.weather?.[0].description}</span>
              </div>

              <div className={styles.temperatures}>
                <Mapper
                  items={[
                    {
                      value: format('temperature', data?.main.temp_min ?? 0),
                      text: 'Mín',
                    },
                    {
                      value: format('temperature', data?.main.temp ?? 0),
                      text: 'Atual',
                    },
                    {
                      value: format('temperature', data?.main.temp_max ?? 0),
                      text: 'Máx',
                    },
                  ]}
                  keyExtractor={(temp) => temp.text}
                  renderItem={({ item: temp }) => (
                    <div className={styles.temperature}>
                      <p>{temp.value}</p>
                      <span>{temp.text}</span>
                    </div>
                  )}
                />
              </div>

              <div className={styles.informations}>
                <Mapper
                  items={[
                    {
                      Icon: Thermometer,
                      value: format('temperature', data?.main.feels_like ?? 0),
                    },
                    {
                      Icon: Wind,
                      value: format('speed', data?.wind?.speed ?? 0),
                    },
                    {
                      Icon: Droplets,
                      value: format('humidity', data?.main.humidity ?? 0),
                    },
                    {
                      Icon: Sunrise,
                      value: format('timezone', data?.sys?.sunrise ?? 0),
                    },
                    {
                      Icon: Sunset,
                      value: format('timezone', data?.sys?.sunset ?? 0),
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
          }
        />
      }
    />
  )
}
