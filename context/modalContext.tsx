import { createContext } from "react"
import Modal from "../components/common/Modal"
import useModal from '../hooks/useModal'

let ModalContext

const { Provider } = (ModalContext = createContext(null))

const ModalProvider = ({children}) => {

  const { modalActive, modalTitle, handleModal, clearModal, closeModal, modalButtons, modalContent, modalSize } = useModal()

  return (
    <Provider value={{ modalActive, modalTitle, handleModal, clearModal, closeModal, modalButtons, modalContent, modalSize }}>
      <Modal />
      { children }
    </Provider>
  )
}

export { ModalContext, ModalProvider }