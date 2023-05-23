'use client'

import { Fragment, FunctionComponent, useMemo } from 'react'

import { Tabs as TabsEnum } from '@/context/TabContext/types'
import { useTabs } from '@/hooks/useTabs'
import { CurrentWeather } from '@/components/CurrentWeather'
import { Map } from '@/components/Map'
import { Tabs } from '@/components/Tabs'

type Content = Record<TabsEnum, FunctionComponent<{}>>

export function PageContent() {
  const { activeTab } = useTabs()

  const Content = useMemo<FunctionComponent>(() => {
    const contents: Content = {
      [TabsEnum.LOCATION]: CurrentWeather,
      [TabsEnum.MAP]: Map,
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
