import Button from "../Button";
import MediaLibrary from "../../media/MediaLibrary";
import DocumentItem from "../ContentEditor/blocks/DocumentBlock/DocumentItem";
import { handleModal } from "../../../stores/modalStore";
import MediaUploader from "../../media/MediaUploader";

const DocumentSelector = ({file, onSelect, onRemove}) => {

  const selectDocumentModal = () => {
    handleModal({
      title: `Choose a file`,
      content: <MediaLibrary typeFilter={['document']} onItemSelect={onSelect} />,
      size: 'lg'
    })
  }

  const onUploadComplete = (value) => {
    console.log('value')
    console.log(value)
  }
  return (
    <>
      { file ? (
        <DocumentItem file={file} onRemove={onRemove} />
      ) : (
        <div className='text-center'>
          <MediaUploader onUploadComplete={onUploadComplete} />
          {/* <Button onClick={selectDocumentModal}>Select a document file</Button> */}
        </div>
      )}
    </>
  )
}

export default DocumentSelector