import { ModalParams } from '@/components/Modal'

export interface ModalContextValues {
  showModal: (params: ModalParams) => void
  closeModal: () => void
}
