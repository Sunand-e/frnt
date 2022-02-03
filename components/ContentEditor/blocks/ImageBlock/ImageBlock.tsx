import {
  FunctionComponent,
  useContext
} from 'react';
import ResizeableElement from '../common/ResizeableElement';
import useBlockEditor from '../../useBlockEditor';
import ImageLibraryModal from './ImageLibraryModal';
import ConditionalWrapper from '../../../common/ConditionalWrapper';
import { ModalContext } from '../../../../context/modalContext';

export const ImageBlock: FunctionComponent = ({block}) => {

  const  defaultWidth = '50%';

  return (
    <img
      className={`block max-w-full px-1 w-full borderRadius[3px] object-cover boxShadow[0 0 0 1px rgb(59,130,249)]`}
      src={block.properties.url ?? '/images/image-block-placeholder.jpg'}
    />
  );
}

export default ImageBlock