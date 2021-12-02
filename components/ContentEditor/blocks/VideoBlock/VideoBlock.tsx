import {
  useEffect,
  useState,
} from 'react';
import ResizeableElement from '../common/ResizeableElement';

export const VideoBlock = ({id, block, onUpdateBlock: updateBlock}) => {
  const { properties } = block

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
      id={id}
      width={width === 0 ? defaultWidth : width + 'px'}
      onResizeStop={setWidth}
    >
      <div className="aspect-w-16 aspect-h-9 px-1">
        <iframe 
          src="https://player.vimeo.com/video/375411414?h=19f812595c&title=0&byline=0&portrait=0" 
          width="640" 
          height="360" 
          frameBorder="0" 
          allow="autoplay; fullscreen; picture-in-picture" 
          allowFullScreen
        />
      </div>
    </ResizeableElement>
  );
}

export default VideoBlock