import { FunctionComponent, useContext } from 'react'
import { ModalContext } from '../../../../context/modalContext';
import Button from '../../../Button';
import MediaLibrary from '../../../MediaLibrary/MediaLibrary'
import useBlockEditor from '../../useBlockEditor';
import DocumentItem from './DocumentItem';
// @styled-icons/bootstrap/FilePdf
// @styled-icons/simple-icons/Microsoftexcel
// @styled-icons/boxicons-solid/FileDoc

const DocumentBlockEdit: FunctionComponent = ({block}) => {

  const { handleModal, closeModal } = useContext(ModalContext)
  
  const { updateBlock } = useBlockEditor()

  const file = block?.properties?.file;

  const selectFile = (file) => {
    updateBlock({
      ...block,
      properties: {
        ...block.properties,
        file
      }
    })
    closeModal()
  }

  const selectDocumentModal = () => {
    handleModal({
      title: `Choose a file`,
      content: <MediaLibrary typeFilter={['document']} onItemSelect={selectFile} />,
      size: 'lg'
    })
  }
  
  const handleDelete = (e) => {
    e.preventDefault()
    updateBlock({
      ...block,
      properties: {
        ...block.properties,
        file: null
      }
    })
  }

  return (
    <>
    { file ? (
      <DocumentItem file={file} onDelete={handleDelete}/>
    ) : (
      <div className='text-center'>
        <Button onClick={selectDocumentModal}>Select a document</Button>
      </div>
    )
    }
    </>
  )
}

export default DocumentBlockEdit
