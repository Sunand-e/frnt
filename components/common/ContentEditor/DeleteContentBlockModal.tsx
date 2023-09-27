import { closeModal } from '../../../stores/modalStore';
import Button from '../Button';
import blocktypes from './blocktypes';

const DeleteContentBlockModal = ({block, onDelete, typeLabel=null}) => {

  const typeName = (typeLabel || `${blocktypes[block.type].text} block`).toLowerCase()

  const deleteBlockAndCloseModal = (e) => {
    onDelete()
    closeModal()
  }

  return (
    <>
      <p className='mb-2'>Are you sure you want to delete this <strong>{typeName}</strong>?</p>
      <Button onClick={deleteBlockAndCloseModal}>{`Delete ${typeName}`}</Button>
    </>
  );
}

export default DeleteContentBlockModal