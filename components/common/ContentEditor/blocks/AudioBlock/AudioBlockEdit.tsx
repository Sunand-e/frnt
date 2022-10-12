import { FunctionComponent, useContext } from 'react'
import { ModalContext } from '../../../../../context/modalContext';
import AudioSelector from '../../../inputs/AudioSelector';
import useBlockEditor from '../../useBlockEditor';
// @styled-icons/bootstrap/FilePdf
// @styled-icons/simple-icons/Microsoftexcel
// @styled-icons/boxicons-solid/FileDoc

const AudioBlockEdit: FunctionComponent = ({block}) => {

  const { closeModal } = useContext(ModalContext)
  
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

  return (
    <>
      <AudioSelector url={file?.location} onSelect={selectFile} buttonContainerClass={`text-center`} />
    </>
  )
}

export default AudioBlockEdit
