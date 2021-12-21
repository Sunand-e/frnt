import {
  useEffect,
  useState,
  FunctionComponent
} from 'react';
import ResizeableElement from '../common/ResizeableElement';
import { Container, Section, Bar } from 'react-simple-resizer';
import useBlockEditor from '../../useBlockEditor';

export const ImageBlock: FunctionComponent = ({block}) => {
  const { properties } = block

  const { updateBlock } = useBlockEditor()

  const  defaultWidth = '50%';
  
  const  [width, setWidth] = useState( properties.width || 0)

  useEffect(() => {
    const updatedBlock = {
      ...block,
      properties: {
        ...properties,
        width
      }
    }
    updateBlock(updatedBlock)
  }, [width]);

  return (
    <ResizeableElement
      id={block.id}
      width={width === 0 ? defaultWidth : width + 'px'}
      onResizeStop={setWidth}
    >
    <img
        data-testid="ImageElementImage"
        className={`block max-w-full px-1 w-full borderRadius[3px] object-cover boxShadow[0 0 0 1px rgb(59,130,249)]`}
        src={properties.url}
      />

    </ResizeableElement>
  );
}

export default ImageBlock