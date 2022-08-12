import { useContext, useEffect } from 'react';
import { headerButtonsVar } from '../../graphql/cache';
import Button from '../../components/Button';
import MediaLibrary from '../../components/MediaLibrary/MediaLibrary';
import UploadModal from '../../components/MediaLibrary/UploadModal';
import { ModalContext } from '../../context/modalContext';
import usePageTitle from '../../hooks/usePageTitle';
import { Upload } from '@styled-icons/boxicons-regular/Upload'
import useHeaderButtons from "../../hooks/useHeaderButtons";

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
      content: <UploadModal />
    })
  }

  // useEffect(() => {
  //   headerButtonsVar(
  //     <>
  //       {/* <Button onClick={() => router.push('/admin/courses')}>Cancel</Button> */}
  //       <Button onClick={handleUploadModal}>Upload files</Button>
  //     </>
  //   )
  // },[])

  useHeaderButtons([
    [<UploadButton />, () => handleUploadModal() ]
  ])

  return (
    <>
      <div className="">
        <MediaLibrary onItemSelect={console.log}/>
      </div>
    </>
  )
}

MediaLibraryPage.navState = {
  topLevel: 'medialibrary',
}

export default MediaLibraryPage
