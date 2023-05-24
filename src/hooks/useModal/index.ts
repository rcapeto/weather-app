import { useContext } from 'react'

import { ModalContext } from '@/context/Modal'

export function useModal() {
  return useContext(ModalContext)
}
