import {Trash} from '@styled-icons/heroicons-outline/Trash'
import { useCallback, useContext } from 'react'
import { ModalContext } from '../../context/modalContext'
import useDeleteMediaItem from '../../hooks/mediaItems/useDeleteMediaItem'
import dayjs from 'dayjs'
import filesize from 'filesize'

interface MediaPreviewProps {
  item?: {[key: string]: any}
}

const MediaPreview = ({item}: MediaPreviewProps) => {

  const { deleteMediaItem } = useDeleteMediaItem()
  
  const { handleModal, closeModal } = useContext(ModalContext)

  const handlePreviewModal = (item) => {
    if(item.mediaType === 'image') {
      handleModal({
        size: 'lg',
        title: `Media preview`,
        content: <MediaPreview item={item} />
      })  
    }
  }
  const handleDelete = useCallback((e) => {
    deleteMediaItem(item.id)
    closeModal()
  },[item])

  const uploadedDate = dayjs(item?.createdAt).format('MMMM D, YYYY [at] h:mm A')

  return (
    
    <div className="h-[60vh] flex">
      <div className="w-full md:w-4/6 flex items-center justify-center">
        <img src={item.location} alt="" className="max-h-full max-w-full" />
      </div>
      <div className="w-2/6 flex flex-col justify-between h-full">
        <div className="mediaDetails">
          <h3 className='font-bold mb-2'>{item.fileName}</h3>
          <p>
            <span className='font-medium'>Media type: </span>
            <span className='capitalize'> capitalize{item.mediaType}</span>
          </p>
          <p><span className='font-medium'>File size: </span>{ filesize(item.fileSize)}</p>
          <p><span className='font-medium'>Uploaded: </span>{ uploadedDate }</p>
        </div>
        <div className="mediaActions flex items-end justify-end">
          <button onClick={handleDelete}>
            <div className="bg-red-600 hover:bg-red-800 text-white rounded-full w-8 h-8 flex justify-center">
              <Trash className={`w-6 cursor-pointer`} />
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}

export default MediaPreview