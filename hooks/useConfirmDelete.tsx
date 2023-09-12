import Button from '../components/common/Button';
import { closeModal, handleModal } from '../stores/modalStore';

const useConfirmDelete = ({itemType, name=null, onConfirm, autoClose=true, onExit=null}) => {

  const handleDelete = () => {
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

  const confirmDelete = () => {
    handleModal({
      title: `Delete ${itemType}`,
      content: (
        <>
          <p>
            Are you sure you want to delete {displayName} ?
          </p>
          <p className="font-bold mb-2">This action cannot be undone.</p>
          <Button onClick={handleDelete}>{`Delete ${itemType}`}</Button>
        </>
      )
    })
  }

  return {
    confirmDelete
  }
}

export default useConfirmDelete