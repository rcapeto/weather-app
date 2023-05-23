'use client'
import {
  forwardRef,
  ForwardRefRenderFunction,
  ReactNode,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react'
import styles from './styles.module.css'
import { Button } from '@/components/Button'

interface ShowModalParams {
  title: string
  buttonText: string
  description: string
  onPress?: () => void
  content?: ReactNode
}

export type ModalParams = Partial<ShowModalParams>

export interface ModalActions {
  showModal: (params: ModalParams) => void
  closeModal: () => void
}

const Modal: ForwardRefRenderFunction<ModalActions> = (_, ref) => {
  const [isActive, setIsActive] = useState(false)
  const [state, setState] = useState<ModalParams | null>(null)

  const modalOverlayClass = useMemo(() => {
    const classes: string[] = [styles['modal-overlay']]

    if (isActive) {
      classes.push(styles.isActive)
    }

    return classes.join(' ')
  }, [isActive])

  function showModal(params: ModalParams) {
    setIsActive(true)
    setState(params)
  }

  function closeModal() {
    setIsActive(false)
    setState(null)
  }

  useImperativeHandle(ref, () => ({
    showModal,
    closeModal,
  }))

  return (
    <div className={modalOverlayClass}>
      <main className={styles['modal-content']}>
        {state?.title && (
          <header>
            <span>{state.title}</span>
          </header>
        )}

        <section className={styles['modal-content-scroll']}>
          {state?.description && <p>{state.description}</p>}
        </section>

        {state?.buttonText && (
          <footer>
            <Button text={state.buttonText} onPress={state?.onPress} />
          </footer>
        )}
      </main>
    </div>
  )
}

export default forwardRef(Modal)
