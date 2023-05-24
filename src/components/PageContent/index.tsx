'use client'

import { Fragment } from 'react'

import { Compose } from '@/components/Compose'

import ModalContextProvider from '@/context/Modal'
import TabContextProvider from '@/context/Tabs'
import LocationContextProvider from '@/context/Location'
import HistoryContextProvider from '@/context/History'

import { CurrentContent } from './CurrentContent'

const contexts = [
  ModalContextProvider,
  TabContextProvider,
  HistoryContextProvider,
  LocationContextProvider,
]

export function PageContent() {
  return (
    <Fragment>
      <Compose contexts={contexts}>
        <CurrentContent />
      </Compose>
    </Fragment>
  )
}
