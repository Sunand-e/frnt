import Button from '../components/common/Button';
import { closeModal, handleModal } from '../stores/modalStore';

type UseConfirmDeleteParams = {
  itemType: string;
  name?: string | null;
  onConfirm?: (() => void) | null;
  defaultOnConfirm?: (() => void) | null;
  autoClose?: boolean;
  onExit?: (() => void) | null;
  amount?: number;
  displayActionText?: string;
};

const useConfirmDelete = ({ itemType, name = null, onConfirm = null,
  defaultOnConfirm = null,
  autoClose = true,
  onExit = null,
  amount = 1,
  displayActionText = 'Delete'
}: UseConfirmDeleteParams) => {

  const handleDelete = ({ onConfirm = null }) => {
    console.log('onConfirm')
    console.log(onConfirm)
    onConfirm ? onConfirm() : defaultOnConfirm && defaultOnConfirm()
    autoClose && closeModal()
  }

  const getDisplayName = () => {
    if (amount > 1) {
      return `${amount} ${itemType}s`
    } else if (name) {
      return <>
        the {itemType}: <span className="font-bold">{name}</span>
      </>
    } else {
      return `this ${itemType}`
    }
  }

  const confirmDelete = () => {
    handleModal({
      title: `${displayActionText} ${itemType}`,
      content: (
        <>
          <p>
            Are you sure you want to {displayActionText.toLowerCase()} {getDisplayName()}?
          </p>
          <p className="font-bold mb-2">This action cannot be undone.</p>
          <Button onClick={() => handleDelete({ onConfirm })}>
            {`${displayActionText} ${itemType}`}
          </Button>
        </>
      )
    })
  }

  return {
    confirmDelete
  }
}

export default useConfirmDelete