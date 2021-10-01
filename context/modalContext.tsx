import { createContext } from "react"
import Modal from "../components/Modal"
import useModal from '../hooks/useModal'

let ModalContext

const { Provider } = (ModalContext = createContext(null))

const ModalProvider = ({children}) => {

  const { modalActive, modalTitle, handleModal, clearModal, closeModal, modalButtons, modalContent } = useModal()

  return (
    <Provider value={{ modalActive, modalTitle, handleModal, clearModal, closeModal, modalButtons, modalContent }}>
      <Modal />
      { children }
    </Provider>
  )
}

export { ModalContext, ModalProvider }