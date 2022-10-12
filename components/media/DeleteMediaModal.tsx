import { useContext } from 'react';
import { ModalContext } from "../../context/modalContext";
import useDeleteMediaItem from "../../hooks/mediaItems/useDeleteMediaItem";
import Button from "../common/Button";
import MediaInUse from './MediaInUse';

const DeleteMediaItemModal = ({item, onDelete=null, onCancel}) => {

  const { deleteMediaItem, deleteMediaItemResponse } = useDeleteMediaItem()

  const { handleModal } = useContext(ModalContext)

  const handleDelete = async () => {
    const response = await deleteMediaItem(item.id)
    if(response.deleteMediaItem?.success === false) {
      if(response.deleteMediaItem?.usage === true) {
        handleModal({
          size: 'lg',
          title: `Media preview`,
          content: <MediaInUse item={item} usageReport={response.deleteMediaItem?.usageReport} />
        })
      }
    } else {
      onDelete && onDelete(item)
    }
  }

  return (
    <>
      <p className='break-words'>Are you sure you want to delete {item.fileName}?</p>
      <p className="font-bold mb-2">This action cannot be undone.</p>
      <div className='flex space-x-4'>
        <Button onClick={onCancel}>Cancel</Button>
        <Button displayType="alert" onClick={handleDelete}><>Delete {item.mediaType}</></Button>
      </div>
    </>
  );
}

export default DeleteMediaItemModal