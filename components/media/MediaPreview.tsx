import {Trash} from '@styled-icons/heroicons-outline/Trash'
import { useCallback, useContext } from 'react'
import { ModalContext } from '../../context/modalContext'
import dayjs from 'dayjs'
import {filesize} from 'filesize'
import DeleteMediaItemModal from './DeleteMediaModal'
import { resourceTypes } from '../resources/resourceTypes'
import AudioPlayer from '../common/audio/AudioPlayer'
import dynamic from 'next/dynamic';

const DynamicPdfViewer = dynamic(
  () => import('../common/PdfViewer'),
  { ssr: false }
)

interface MediaPreviewProps {
  item?: {[key: string]: any}
}

const MediaPreview = ({item}: MediaPreviewProps) => {
  
  const { handleModal, closeModal } = useContext(ModalContext)
  
  const handleCancelDelete = (item) => {
    handleModal({
      size: 'lg',
      title: `Media preview`,
      content: <MediaPreview item={item} />
    })
  }

  const handleDelete = useCallback((e) => {
    handleModal({
      size: 'lg',
      title: `Media preview`,
      content: (
        <DeleteMediaItemModal
          onDelete={closeModal}
          onCancel={() => handleCancelDelete(item)}
          item={item}
        />
      )
    })  
  },[item])

  const uploadedDate = dayjs(item?.createdAt).format('MMMM D, YYYY [at] h:mm A')

  const IconDisplay = ({typeName}) => {
    const type = resourceTypes[typeName]
    return <type.icon className="max-w-[20em] w-full text-main" />
    }
    const getMediaTypePreviewComponent = () => {
    switch(item.mediaType) {
      case 'image': {
        return <img src={`/uploaded_images/${item?.id}?w=800`} alt="" className="max-h-full max-w-full" />
      }
      case 'audio': {
        return <AudioPlayer url={item.location} />
      }
      case 'video': {
        return <IconDisplay typeName="video"/>
      }
      case 'document': {
        if(item.location.endsWith('pdf')) {
          return (
            <DynamicPdfViewer url={item.location} className='w-full h-full hidden md:block' />
          )
        } else {
          return <IconDisplay typeName="document"/>
        }
      }
      default: {
        return item.mediaType
      }
    }  
  }

  return (
    
    <div className="h-[60vh] flex space-x-6">
      <div className="w-full md:w-4/6 flex items-center justify-center mb-2">
        { getMediaTypePreviewComponent() }
      </div>
      <div className="w-full md:w-2/6 flex flex-col justify-between h-full">
        <div className="mediaDetails">
          <h3 className='font-bold mb-2 break-words'>{item.fileName}</h3>
          <p>
            <span className='font-medium'>Media type: </span>
            <span className='capitalize'>{item.mediaType}</span>
          </p>
          <p><span className='font-medium'>File size: </span>{ filesize(item.fileSize) as String}</p>
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