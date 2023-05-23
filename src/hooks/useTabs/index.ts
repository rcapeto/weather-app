'use client'

import { useContext } from 'react'
import { TabContext } from '@/context/TabContext'

export function useTabs() {
  return useContext(TabContext)
}
