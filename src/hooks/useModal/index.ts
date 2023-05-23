import { ModalContext } from '@/context/Modal'
import { useContext } from 'react'

export function useModal() {
  return useContext(ModalContext)
}
