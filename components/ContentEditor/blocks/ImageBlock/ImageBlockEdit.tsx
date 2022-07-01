import {
  FunctionComponent, useContext,
} from 'react';
import ResizeableElement from '../common/ResizeableElement';
import useBlockEditor from '../../useBlockEditor';
import ImageSelect from '../../ImageSelect';
import { v4 as uuidv4 } from 'uuid';
import { ModalContext } from '../../../../context/modalContext';

export const ImageBlockEdit: FunctionComponent = ({block}) => {

  const { addBlock } = useBlockEditor(block)
  const { closeModal } = useContext(ModalContext)

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
    closeModal()
  }

  const  defaultWidth = '50%';

  return (
    <ResizeableElement
      block={block}
      defaultWidth={defaultWidth}
    >
      <ImageSelect 
        src={block.properties?.url}
        onSelect={selectImage}
      />
    </ResizeableElement> 
  );
}

export default ImageBlockEdit