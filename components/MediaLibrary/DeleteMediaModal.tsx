import { useContext } from 'react';
import { ModalContext } from "../../context/modalContext";
import useDeleteMediaItem from "../../hooks/mediaItems/useDeleteMediaItem";
import Button from "../Button";

const DeleteMediaItemModal = ({item, onDelete, onCancel}) => {

  const { deleteMediaItem } = useDeleteMediaItem()

  const { closeModal } = useContext(ModalContext)

  const handleDeleteMediaItem = () => {
    deleteMediaItem(item.id)
    onDelete
    closeModal()
  }

  return (
    <>
      <p>Are you sure you want to delete this course?</p>
      <p className="font-bold mb-2">This action cannot be undone.</p>
      <Button onClick={handleDeleteMediaItem}>Delete course</Button>
    </>
  );
}

export default DeleteMediaItemModal