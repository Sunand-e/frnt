import { createContext, PropsWithChildren } from "react"
import Modal from "../components/common/Modal"
import useModal from '../hooks/useModal'

interface ModalContextInterface {
  modalActive?: any,
  modalTitle?: any,
  handleModal?: any,
  clearModal?: any,
  closeModal?: any,
  modalButtons?: any,
  modalContent?: any,
  modalSize?: any
} 

const ModalContext = createContext<ModalContextInterface | null>(null)

const { Provider } = ModalContext

const ModalProvider = ({children}: PropsWithChildren<{}>) => {

  const { modalActive, modalTitle, handleModal, clearModal, closeModal, modalButtons, modalContent, modalSize } = useModal()

  return (
    <Provider value={{ modalActive, modalTitle, handleModal, clearModal, closeModal, modalButtons, modalContent, modalSize }}>
      <Modal />
      { children }
    </Provider>
  )
}

export { ModalContext, ModalProvider }