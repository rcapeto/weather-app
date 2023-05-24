'use client'
import { useState } from 'react'
import { Copy, CopyCheck } from 'lucide-react'

import ConditionRender from '@/components/RenderValidation'

import styles from '../styles.module.css'
import { colors } from '@/config/colors'

interface HistoryItemProps {
  item: string
}

export function HistoryItem({ item }: HistoryItemProps) {
  const [isCopied, setIsCopied] = useState(false)

  async function handleCopyToClipBoard() {
    try {
      await navigator.clipboard.writeText(item)
      setIsCopied(true)
    } catch (err) {
      console.error('[Clipboard] >> Error copy item:', item)
    }
  }

  return (
    <div className={styles.itemContainer} title={item}>
      <p>{item}</p>

      <button type="button" onClick={handleCopyToClipBoard}>
        <ConditionRender
          validation={isCopied}
          validComponent={<CopyCheck color={colors.gray[100]} size={15} />}
          unvalidComponent={<Copy color={colors.gray[100]} size={15} />}
        />
      </button>
    </div>
  )
}
