'use client'

import { PropsWithChildren, createContext, useState } from 'react'

import { ButtonProps } from '@/components/Button'

import { TabContextValues, Tabs } from './types'

export const TabContext = createContext({} as TabContextValues)

export default function TabContextProvider({ children }: PropsWithChildren) {
  const [activeTab, setActiveTab] = useState<Tabs>(Tabs.LOCATION)

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
    {
      text: 'Histórico de pesquisas',
      onPress: handleChangeTab(Tabs.HISTORY),
      variation: activeTab === Tabs.HISTORY ? 'full' : 'border',
    },
  ]

  function updateCurrentTab(tab: Tabs) {
    setActiveTab(tab)
  }

  return (
    <TabContext.Provider value={{ activeTab, buttons, updateCurrentTab }}>
      {children}
    </TabContext.Provider>
  )
}
