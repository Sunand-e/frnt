import { FunctionComponent, useContext } from 'react'
import Button from '../../../Button';
import DocumentSelector from '../../../inputs/DocumentSelector';
import MediaLibrary from '../../../../media/MediaLibrary'
import useBlockEditor from '../../useBlockEditor';
import DocumentItem from './DocumentItem';
import { closeModal } from '../../../../../stores/modalStore';
import { useBlockStore } from '../../useBlockStore';
// @styled-icons/bootstrap/FilePdf
// @styled-icons/simple-icons/Microsoftexcel
// @styled-icons/boxicons-solid/FileDoc

const DocumentBlockEdit: FunctionComponent = ({block}) => {
  
  const updateBlock = useBlockStore(state => state.updateBlock)

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
  
  const handleRemove = (e) => {
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
      <DocumentSelector onSelect={selectFile} onRemove={handleRemove} file={file} />
    </>
  ) 

}

export default DocumentBlockEdit
