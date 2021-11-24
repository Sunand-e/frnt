import { useContext, useEffect } from 'react';
import { headerButtonsVar } from '../../graphql/cache';
import Button from '../../components/Button';
import PageTitle from '../../components/PageTitle';
import MediaLibrary from '../../components/MediaLibrary/MediaLibrary';
import UploadModal from '../../components/MediaLibrary/UploadModal';
import { ModalContext } from '../../context/modalContext';
import FileUploader from '../../components/MediaLibrary/FileUploader';

const MediaLibraryPage = () => {

  const { handleModal } = useContext(ModalContext);

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
      <PageTitle title="Media Library" />
      <div className="px-8">
        <FileUploader />
        <MediaLibrary />
      </div>
    </>
  )
}

MediaLibraryPage.navState = {
  topLevel: 'medialibrary',
}

export default MediaLibraryPage