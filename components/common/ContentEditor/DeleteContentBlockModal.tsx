import React, { useContext } from 'react';
import { ModalContext } from '../../../context/modalContext';
import Button from '../Button';

const DeleteContentBlockModal = ({block, onDelete: handleDeleteBlock}) => {

  const { closeModal } = useContext(ModalContext);

  const deleteBlockAndCloseModal = (e) => {
    handleDeleteBlock()
    closeModal()
  }

  return (
    <>
      <p>Are you sure you want to delete this {block.type} block?</p>
      <Button onClick={deleteBlockAndCloseModal}>{`Delete ${block.type} block`}</Button>
    </>
  );
}

export default DeleteContentBlockModal