import {
  FunctionComponent,
  useContext
} from 'react';
import ResizeableElement from '../common/ResizeableElement';
import useBlockEditor from '../../useBlockEditor';
import ImageLibraryModal from './ImageLibraryModal';
import { ModalContext } from '../../../../context/modalContext';
import ImageSelect from '../../ImageSelect';
import { v4 as uuidv4 } from 'uuid';

export const ImageBlockEdit: FunctionComponent = ({block}) => {

  const { addBlock } = useBlockEditor(block)

  // const { handleModal } = useModal()
  const { handleModal } = useContext(ModalContext);

  const selectImage = (image) => {
    const newBlock = {
      type: 'image',
      id: uuidv4(),
      properties: {
        url: image.location,
        mediaId: image.id
      }
    }
    addBlock(newBlock, true)
  }

  const showModal = () => {
    handleModal({
      title: `Choose image`,
      content: <ImageLibraryModal onImageSelect={(image) => selectImage(image)} />,
      size: 'lg'
    })
  }

  const  defaultWidth = '50%';

  return (
    <ResizeableElement
      block={block}
      defaultWidth={defaultWidth}
    >
      <ImageSelect 
        src={block.properties.url}
        onClick={showModal}
      />
    </ResizeableElement> 
  );
}

export default ImageBlockEdit