'use client'

import { PropsWithChildren, createContext, useRef } from 'react'

import Modal, { ModalActions, ModalParams } from '@/components/Modal'

import { ModalContextValues } from './types'

export const ModalContext = createContext({} as ModalContextValues)

export default function ModalContextProvider(props: PropsWithChildren) {
  const modalRef = useRef<ModalActions>(null)

  function showModal(params: ModalParams) {
    const modal = modalRef.current

    if (modal) {
      modal.showModal(params)
    }
  }

  function closeModal() {
    const modal = modalRef.current

    if (modal) {
      modal.closeModal()
    }
  }

  return (
    <ModalContext.Provider value={{ showModal, closeModal }}>
      <Modal ref={modalRef} />
      {props.children}
    </ModalContext.Provider>
  )
}
