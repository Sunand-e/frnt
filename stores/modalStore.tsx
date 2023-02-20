import { FC, ReactNode } from "react"
import create from "zustand"

interface ModalState {
  modalActive?: boolean,
  modalTitle?: string | null,
  modalButtons?: ReactNode | null,
  modalContent?: ReactNode | null,
  modalSize?: string | null
} 

export const useModalStore = create<ModalState>(set => ({
  modalActive: false,
  modalTitle: "",
  modalButtons: null,
  modalContent: null,
  modalSize: null
}))


export const handleModal = ({
  title = null, 
  content = null, 
  buttons = null, 
  size = null
}) => {
  useModalStore.setState({
    modalSize: size ?? 'sm',
    modalActive: true,
    ...(Boolean(title) && {modalTitle: title}),
    ...(Boolean(content) && {modalContent: content}),
    ...(Boolean(buttons) && {modalButtons: buttons}),
  })
}

export const clearModal = () => useModalStore.setState({
  modalTitle: null,
  modalContent: null,
  modalButtons: null
})

export const closeModal = () => useModalStore.setState({modalActive: false})