import { closeModal } from '../../../stores/modalStore';
import Button from '../Button';
import blocktypes from './blocktypes';

const DeleteContentBlockModal = ({block, onDelete: handleDeleteBlock}) => {

  const typeName = blocktypes[block.type].text.toLowerCase()

  const deleteBlockAndCloseModal = (e) => {
    handleDeleteBlock()
    closeModal()
  }

  return (
    <>
      <p className='mb-2'>Are you sure you want to delete this <strong>{typeName}</strong> block?</p>
      <Button onClick={deleteBlockAndCloseModal}>{`Delete ${typeName} block`}</Button>
    </>
  );
}

export default DeleteContentBlockModal