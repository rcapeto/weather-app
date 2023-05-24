'use client'

import { useContext } from 'react'
import { TabContext } from '@/context/Tabs'

export function useTabs() {
  return useContext(TabContext)
}
