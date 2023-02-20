import { useContext } from 'react';
import MediaLibrary from '../../components/media/MediaLibrary';
import usePageTitle from '../../hooks/usePageTitle';
import { Upload } from '@styled-icons/boxicons-regular/Upload'
import useHeaderButtons from "../../hooks/useHeaderButtons";
import MediaUploader from '../../components/media/MediaUploader';
import MediaPreview from '../../components/media/MediaPreview';
import { handleModal } from '../../stores/modalStore';

const UploadButton = () => (
  <>
    <span className='hidden lg:block'>Upload files</span>
    <span className='block lg:hidden'><Upload  width="20" /></span>
  </>
)

const MediaLibraryPage = () => {

  usePageTitle({ title: 'Media Library' })

  const handleUploadModal = () => {
    handleModal({
      title: `Upload files`,
      content: <MediaUploader />
    })
  }
  
  const handlePreviewModal = (item) => {
    handleModal({
      size: 'lg',
      title: `Media preview`,
      content: <MediaPreview item={item} />
    })
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
