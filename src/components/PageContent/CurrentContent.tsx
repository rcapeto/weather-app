import { Fragment, FunctionComponent, useMemo } from 'react'

import { Tabs as TabsEnum } from '@/context/Tabs/types'
import { useTabs } from '@/hooks/useTabs'

import { CurrentWeather } from '@/components/CurrentWeather'
import { Map } from '@/components/Map'
import { Tabs } from '@/components/Tabs'
import { History } from '@/components/History'

type Content = Record<TabsEnum, FunctionComponent<{}>>

export function CurrentContent() {
  const { activeTab } = useTabs()

  const Content = useMemo<FunctionComponent>(() => {
    const contents: Content = {
      [TabsEnum.LOCATION]: CurrentWeather,
      [TabsEnum.MAP]: Map,
      [TabsEnum.HISTORY]: History,
    }

    return contents[activeTab]
  }, [activeTab])
  return (
    <Fragment>
      <Tabs />
      <Content />
    </Fragment>
  )
}
