'use-client'

import { PropsWithChildren, createContext, useState } from 'react'

import { HistoryContextValues } from './types'

export const HistoryContext = createContext({} as HistoryContextValues)

export default function HistoryContextProvider({
  children,
}: PropsWithChildren) {
  const [locationsHistory, setLocationsHistory] = useState<string[]>([])

  function handleAddLocationInHistory(address: string) {
    setLocationsHistory((prevHistory) => [...prevHistory, address])
  }

  return (
    <HistoryContext.Provider
      value={{
        locationsHistory,
        handleAddLocationInHistory,
      }}
    >
      {children}
    </HistoryContext.Provider>
  )
}
