import { useState } from 'react'

const useModal = () => {
  const [modalActive, setModalActive] = useState(false)
  const [modalTitle, setModalTitle] = useState("Modal Title")
  const [modalContent, setModalContent] = useState("Modal Content")
  const [modalButtons, setModalButtons] = useState(false)

  const handleModal = ({title = null, content = null, buttons = null}) => {
    // if(!modalActive) {
    title && setModalTitle(title)
    content && setModalContent(content)
    buttons && setModalButtons(buttons)
    // }
    setModalActive(true)
    // setModalActive(!modalActive)
  }

  const closeModal = () => {
    setModalActive(false)
  }
  
  const clearModal = () => {
    setModalTitle(null)
    setModalContent(null)
    setModalButtons(null)
}

  return { 
    modalActive,
    modalTitle, 
    handleModal,
    closeModal, 
    clearModal, 
    modalButtons, 
    modalContent
  }

}

export default useModal