import { useContext } from 'react';
import MediaLibrary from '../../components/MediaLibrary/MediaLibrary';
import { ModalContext } from '../../context/modalContext';
import usePageTitle from '../../hooks/usePageTitle';
import { Upload } from '@styled-icons/boxicons-regular/Upload'
import useHeaderButtons from "../../hooks/useHeaderButtons";
import MediaUploader from '../../components/MediaLibrary/MediaUploader';

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
