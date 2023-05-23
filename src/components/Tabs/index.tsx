'use client'

import { useTabs } from '@/hooks/useTabs'

import { Mapper } from '@/components/Mapper'
import { Button } from '@/components/Button'

import styles from './styles.module.css'

export function Tabs() {
  const { buttons } = useTabs()

  return (
    <div className={styles.tabs}>
      <Mapper
        items={buttons}
        keyExtractor={(button) => `${button.text}-${Date.now()}`}
        renderItem={({ item }) => <Button {...item} />}
      />
    </div>
  )
}
