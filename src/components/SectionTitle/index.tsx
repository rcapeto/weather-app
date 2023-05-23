import { ReactNode } from 'react'
import styles from './styles.module.css'

interface SectionTitleProps {
  text: string
  className?: string
  rightIcon?: ReactNode
}

export function SectionTitle({
  text,
  className,
  rightIcon,
}: SectionTitleProps) {
  return (
    <div className={[styles.sectionContainer, className ?? ''].join(' ')}>
      <h5 className={styles.sectionText}>{text}</h5>

      {rightIcon && <div className={styles.iconContainer}>{rightIcon}</div>}
    </div>
  )
}
