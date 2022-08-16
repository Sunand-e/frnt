import { useContext } from "react";
import { ModalContext } from "../../../context/modalContext";
import Button from "../../Button";
import MediaLibrary from "../../MediaLibrary/MediaLibrary";
import DocumentItem from "../../ContentEditor/blocks/DocumentBlock/DocumentItem";

const DocumentSelector = ({file, onSelect, onRemove}) => {

  const { handleModal } = useContext(ModalContext)

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