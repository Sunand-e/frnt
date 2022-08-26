import { useContext } from 'react';
import MediaLibrary from '../../components/MediaLibrary/MediaLibrary';
import { ModalContext } from '../../context/modalContext';
import usePageTitle from '../../hooks/usePageTitle';
import { Upload } from '@styled-icons/boxicons-regular/Upload'
import useHeaderButtons from "../../hooks/useHeaderButtons";
import MediaUploader from '../../components/MediaLibrary/MediaUploader';
import MediaPreview from '../../components/MediaLibrary/MediaPreview';

const UploadButton = () => (
  <>
    <span className='hidden lg:block'>Upload files</span>
    <span className='block lg:hidden'><Upload  width="20" /></span>
  </>
)

const MediaLibraryPage = () => {

  const { handleModal } = useContext(ModalContext);

  usePageTitle({ title: 'Media Library' })

  const handleUploadModal = () => {
    handleModal({
      title: `Upload files`,
      content: <MediaUploader />
    })
  }
  
  const handlePreviewModal = (item) => {
    if(item.mediaType === 'image') {
      handleModal({
        size: 'lg',
        title: `Media preview`,
        content: <MediaPreview item={item} />
      })  
    }
  }

  useHeaderButtons([
    [<UploadButton />, () => handleUploadModal() ]
  ])

  return (
    <>
      <div className="">
        <MediaLibrary onItemSelect={handlePreviewModal}/>
      </div>
    </>
  )
}

MediaLibraryPage.navState = {
  topLevel: 'medialibrary',
}

export default MediaLibraryPage
