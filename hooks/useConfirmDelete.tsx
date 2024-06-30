import { getDisplayName } from 'next/dist/shared/lib/utils';
import Button from '../components/common/Button';
import { closeModal, handleModal } from '../stores/modalStore';

const useConfirmDelete = ({itemType, name=null, onConfirm: defaultOnConfirm = null, autoClose=true, onExit=null}) => {

  const handleDelete = ({onConfirm=null}) => {
    onConfirm ? onConfirm() : defaultOnConfirm && defaultOnConfirm()
    // onExit ? onExit() : closeModal()
    autoClose && closeModal()
  }

  const getDisplayName = (amount) => {
    if(amount > 1) {
      return `${amount} ${itemType}s`
    } else if(name) {
      return <>
        the {itemType}: <span className="font-bold">{name}</span>
      </>
    } else {
      return `this ${itemType}`
    }
  }

  const confirmDelete = ({onConfirm, amount=1}) => {
    handleModal({
      title: `Delete ${itemType}`,
      content: (
        <>
          <p>
            Are you sure you want to delete {getDisplayName(amount)}?
          </p>
          <p className="font-bold mb-2">This action cannot be undone.</p>
          <Button onClick={()=>handleDelete({onConfirm})}>{`Delete ${itemType}`}</Button>
        </>
      )
    })
  }

  return {
    confirmDelete
  }
}

export default useConfirmDelete