import { FunctionComponent, useContext } from 'react'
import ReactPlayer from 'react-player';
import { ModalContext } from '../../../../context/modalContext';
import Button from '../../../Button';
import MediaLibrary from '../../../MediaLibrary/MediaLibrary'
import useBlockEditor from '../../useBlockEditor';
// @styled-icons/bootstrap/FilePdf
// @styled-icons/simple-icons/Microsoftexcel
// @styled-icons/boxicons-solid/FileDoc

const AudioBlockEdit: FunctionComponent = ({block}) => {

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

  const selectAudioModal = () => {
    handleModal({
      title: `Choose a file`,
      content: <MediaLibrary typeFilter={['audio']} onItemSelect={selectFile} />,
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
      // <Audio file={file} onDelete={handleDelete}/>
      <ReactPlayer
        url={file.location}
        controls 
        width='100%'
        height={50}
      />
    ) : (
      <div className='text-center'>
        <Button onClick={selectAudioModal}>Select an audio file</Button>
      </div>
    )
    }
    </>
  )
}

export default AudioBlockEdit
