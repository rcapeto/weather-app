'use client'

import { PropsWithChildren, createContext, useState } from 'react'
import { TabContextValues, Tabs } from './types'
import { ButtonProps } from '@/components/Button'

export const TabContext = createContext({} as TabContextValues)

export default function TabContextProvider({ children }: PropsWithChildren) {
  const [activeTab, setActiveTab] = useState<Tabs>(Tabs.MAP)

  function handleChangeTab(tab: Tabs) {
    return function () {
      setActiveTab(tab)
    }
  }

  const buttons: ButtonProps[] = [
    {
      text: 'Sua localização',
      onPress: handleChangeTab(Tabs.LOCATION),
      variation: activeTab === Tabs.LOCATION ? 'full' : 'border',
    },
    {
      text: 'Mapa',
      onPress: handleChangeTab(Tabs.MAP),
      variation: activeTab === Tabs.MAP ? 'full' : 'border',
    },
  ]

  return (
    <TabContext.Provider value={{ activeTab, buttons }}>
      {children}
    </TabContext.Provider>
  )
}
