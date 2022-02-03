import {
  FunctionComponent,
  useContext
} from 'react';
import ResizeableElement from '../common/ResizeableElement';
import useBlockEditor from '../../useBlockEditor';
import ImageLibraryModal from './ImageLibraryModal';
import ConditionalWrapper from '../../../common/ConditionalWrapper';
import { ModalContext } from '../../../../context/modalContext';

export const ImageBlockEdit: FunctionComponent = ({block}) => {

  const { addBlock } = useBlockEditor(block)

  // const { handleModal } = useModal()
  const { handleModal } = useContext(ModalContext);

  const selectImage = () => {
    handleModal({
      title: `Choose image`,
      content: <ImageLibraryModal onImageSelect={(block) => addBlock(block, true)} />,
      size: 'lg'
    })
  }

  const  defaultWidth = '50%';

  return (
    <ResizeableElement
      block={block}
      defaultWidth={defaultWidth}
    >
      <div className={`relative`}>
        <img
          className={`block max-w-full px-1 w-full borderRadius[3px] object-cover boxShadow[0 0 0 1px rgb(59,130,249)]`}
          src={block.properties.url ?? '/images/image-block-placeholder.jpg'}
        />
        <div className={`absolute w-full h-full top-0 left-0 flex items-center justify-center  opacity-0 hover:opacity-100`}>
          <a className="cursor-pointer bg-main-dark bg-opacity-60 text-white py-1 px-4 rounded hover:bg-opacity-90" onClick={selectImage}>Choose image</a>
        </div>
      </div>
    </ResizeableElement> 
  );
}

export default ImageBlockEdit