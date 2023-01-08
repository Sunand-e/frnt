import { useContext } from 'react';
import { ModalContext } from "../context/modalContext";
import Button from '../components/common/Button';

const useConfirmModal = ({itemType, name, onConfirm, autoClose=true}) => {

  const { handleModal, closeModal } = useContext(ModalContext)

  const handleConfirm = () => {
    onConfirm()
    // onExit ? onExit() : closeModal()
    autoClose && closeModal()
  }

  const displayName = name ? (
    <>
      the {itemType}: <span className="font-bold">{name}</span>
    </>
  ) : (
    <>this {itemType}</>
  )

  const confirmModal = () => {
    handleModal({
      title: `Modal ${itemType}`,
      content: (
        <>
          <p>
            
          </p>
          <p className="font-bold mb-2">This action cannot be undone.</p>
          <Button onClick={handleConfirm}>{`Modal ${itemType}`}</Button>
        </>
      )
    })
  }

  return {
    confirmModal
  }
}

export default useConfirmModal