import { ButtonProps } from '@/components/Button'

export enum Tabs {
  LOCATION = 'current_location',
  MAP = 'map',
  HISTORY = 'history_address',
}

export interface TabContextValues {
  buttons: ButtonProps[]
  activeTab: Tabs
  updateCurrentTab: (tab: Tabs) => void
}
