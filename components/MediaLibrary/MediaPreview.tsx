import {Trash} from '@styled-icons/heroicons-outline/Trash'
import { useCallback, useContext } from 'react'
import { ModalContext } from '../../context/modalContext'
import useDeleteMediaItem from '../../hooks/mediaItems/useDeleteMediaItem'

interface MediaPreviewProps {
  item?: {[key: string]: any}
}

const MediaPreview = ({item}: MediaPreviewProps) => {

  const { deleteMediaItem } = useDeleteMediaItem()
  
  const { closeModal } = useContext(ModalContext)
  const handleDelete = useCallback((e) => {
    // deleteMediaItem(item.id)
    // closeModal()
  },[item])

  return (
    
    <div className="h-[60vh] flex">
      <div className="w-full flex items-center justify-center">
        <img src={item.location} alt="" className="max-h-full max-w-full" />
      </div>
      {/* <div className="w-2/6">
        <pre>
        { JSON.stringify(item,null,2) }
        </pre>
        <button onClick={handleDelete}>
          <div className="bg-red-600 hover:bg-red-800 text-white rounded-full w-8 h-8 flex justify-center">
            <Trash className={`w-6 cursor-pointer`} />
          </div>
        </button>
      </div> */}
    </div>
  )
}

export default MediaPreview