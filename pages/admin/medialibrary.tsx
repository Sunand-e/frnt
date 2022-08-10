import { useContext, useEffect } from 'react';
import { headerButtonsVar } from '../../graphql/cache';
import Button from '../../components/Button';
import MediaLibrary from '../../components/MediaLibrary/MediaLibrary';
import UploadModal from '../../components/MediaLibrary/UploadModal';
import { ModalContext } from '../../context/modalContext';
import usePageTitle from '../../hooks/usePageTitle';

const MediaLibraryPage = () => {

  const { handleModal } = useContext(ModalContext);

  usePageTitle({ title: 'Media Library' })

  const handleUploadModal = (value) => {
    handleModal({
      title: `Upload files`,
      content: <UploadModal />
    })
  }

  useEffect(() => {
    headerButtonsVar(
      <>
        {/* <Button onClick={() => router.push('/admin/courses')}>Cancel</Button> */}
        <Button onClick={handleUploadModal}>Upload files</Button>
      </>
    )
  },[])

  return (
    <>
      <div className="px-0 sm:px-8">
        <MediaLibrary onItemSelect={console.log}/>
      </div>
    </>
  )
}

MediaLibraryPage.navState = {
  topLevel: 'medialibrary',
}

export default MediaLibraryPage
