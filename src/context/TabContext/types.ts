import { ButtonProps } from '@/components/Button'

export enum Tabs {
  LOCATION = 'current_location',
  MAP = 'map',
}

export interface TabContextValues {
  buttons: ButtonProps[]
  activeTab: Tabs
}
