import { ButtonHTMLAttributes, useMemo } from 'react'
import styles from './styles.module.css'

type NativeButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

export interface ButtonProps
  extends Omit<NativeButtonProps, 'onClick' | 'className'> {
  onPress?: () => void
  text?: string
  buttonStyle?: string
  variation?: 'full' | 'border'
}

export function Button({
  onPress,
  text,
  buttonStyle,
  variation = 'full',
  ...props
}: ButtonProps) {
  const className = useMemo(() => {
    return [styles.button, buttonStyle ?? '', styles[variation]].join(' ')
  }, [buttonStyle, variation])

  return (
    <button onClick={onPress} className={className} {...props}>
      {text}
    </button>
  )
}
