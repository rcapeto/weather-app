import { ReactNode } from 'react'

import { Button } from '@/components/Button'

import styles from './styles.module.css'

interface ErrorPageProps {
  errorMessage?: string
  title?: string
  icon?: ReactNode
  buttonText?: string
  onPressBtn?: () => void
  errorContentStyle?: string
}

export function ErrorPage(props: ErrorPageProps) {
  const {
    buttonText,
    onPressBtn,
    errorMessage,
    icon,
    title,
    errorContentStyle,
  } = props

  return (
    <div
      className={[styles.errorPageContainer, errorContentStyle ?? ''].join(' ')}
    >
      <span className={styles.errorTitle}>{title}</span>

      <div className={styles.iconContainer}>{icon}</div>

      <div className={styles.errorContent}>
        <p>{errorMessage}</p>

        {buttonText && <Button text={buttonText} onPress={onPressBtn} />}
      </div>
    </div>
  )
}
