import { useState } from 'react'

const useModal = () => {
  const [modalActive, setModalActive] = useState(false)
  const [modalTitle, setModalTitle] = useState("Modal Title")
  const [modalContent, setModalContent] = useState("Modal Content")
  const [modalButtons, setModalButtons] = useState(false)
  const [modalSize, setModalSize] = useState(false)

  const handleModal = ({title = null, content = null, buttons = null, size = null}) => {
    // if(!modalActive) {
    title && setModalTitle(title)
    content && setModalContent(content)
    buttons && setModalButtons(buttons)
    let mSize = size ?? 'sm'
    setModalSize(mSize)
    // }
    setModalActive(true)
    // setModalActive(!modalActive)
  }

  const closeModal = () => {
    // alert('closeee')
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
    modalSize,
    modalContent
  }

}

export default useModal