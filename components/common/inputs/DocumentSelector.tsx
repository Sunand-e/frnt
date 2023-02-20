import { useContext } from "react";
import Button from "../Button";
import MediaLibrary from "../../media/MediaLibrary";
import DocumentItem from "../ContentEditor/blocks/DocumentBlock/DocumentItem";
import { handleModal } from "../../../stores/modalStore";

const DocumentSelector = ({file, onSelect, onRemove}) => {

  const selectDocumentModal = () => {
    handleModal({
      title: `Choose a file`,
      content: <MediaLibrary typeFilter={['document']} onItemSelect={onSelect} />,
      size: 'lg'
    })
  }

  return (
    <>
      { file ? (
        <DocumentItem file={file} onRemove={onRemove} />
      ) : (
        <div className='text-center'>
          <Button onClick={selectDocumentModal}>Select a document file</Button>
        </div>
      )}
    </>
  )
}

export default DocumentSelector