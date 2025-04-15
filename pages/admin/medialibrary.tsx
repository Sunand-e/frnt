import MediaLibrary from '../../components/media/MediaLibrary';
import usePageTitle from '../../hooks/usePageTitle';
import MediaPreview from '../../components/media/MediaPreview';
import { handleModal } from '../../stores/modalStore';

const MediaLibraryPage = () => {

  usePageTitle({ title: 'Media Library' })

  const handlePreviewModal = (item: any) => {
    handleModal({
      size: 'lg',
      title: `Media preview`,
      content: <MediaPreview item={item} />
    })
  }

  return (
    <>
      <div className="">
        <MediaLibrary onItemSelect={handlePreviewModal} />
      </div>
    </>
  )
}

MediaLibraryPage.navState = {
  topLevel: 'medialibrary',
}

export default MediaLibraryPage
