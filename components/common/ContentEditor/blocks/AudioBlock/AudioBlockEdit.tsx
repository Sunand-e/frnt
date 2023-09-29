import { FunctionComponent } from 'react'
import { closeModal } from '../../../../../stores/modalStore';
import AudioSelector from '../../../inputs/AudioSelector';
import useBlockEditor from '../../useBlockEditor';
import { useBlockStore } from '../../useBlockStore';
// @styled-icons/bootstrap/FilePdf
// @styled-icons/simple-icons/Microsoftexcel
// @styled-icons/boxicons-solid/FileDoc

const AudioBlockEdit: FunctionComponent = ({block}) => {

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

  return (
    <>
      <AudioSelector url={file?.location} onSelect={selectFile} buttonContainerClass={`text-center`} />
    </>
  )
}

export default AudioBlockEdit
