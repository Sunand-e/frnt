import Button from '../components/common/Button';
import { closeModal, handleModal } from '../stores/modalStore';

const useConfirmAction = ({
  title='Confirm this action', 
  content=<p>Are you sure you want to perform this action?</p>,
  buttonTitle='Confirm',
  onConfirm = null,
  autoClose=true,
  onCancel=null
}) => {

  const handleConfirm = () => {
    !!onConfirm && onConfirm()
    autoClose && closeModal()
  }

  const handleCancel = () => {
    !!onCancel && onCancel()
    autoClose && closeModal()
  }

  const confirmAction = () => {
    handleModal({
      title,
      content: (
        <>
          {content}
          <div className='flex justify-center space-x-4 mt-2'>
            <Button displayType='white' onClick={handleCancel}>Cancel</Button>
            <Button onClick={handleConfirm}>{buttonTitle}</Button>
          </div>
        </>
      )
    })
  }

  return {
    confirmAction
  }
}

export default useConfirmAction