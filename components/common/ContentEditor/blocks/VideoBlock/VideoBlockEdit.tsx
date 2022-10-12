import {
  useContext, useEffect, useState
} from 'react';
import ResizeableElement from '../common/ResizeableElement';
import urlParser from "js-video-url-parser";
import Button from '../../../Button';
import useBlockEditor from '../../useBlockEditor';
import { ModalContext } from '../../../../../context/modalContext';
import VideoUrlSelect from './VideoUrlSelect';

export const VideoBlockEdit = ({block}) => {

  const { blocks, insertBlock, updateBlock, getIndexAndParent, addBlock } = useBlockEditor(block)

  const  defaultWidth = '50%';
  const { closeModal, handleModal } = useContext(ModalContext);

  const handleVideoSelect = (url) => {
    updateBlock({
      ...block,
      properties: {
        ...block.properties,
        url
      }
    })
    closeModal()
  }

  const selectVideoModal = () => {
    handleModal({
      title: `Enter video URL`,
      content: <VideoUrlSelect onVideoSelect={handleVideoSelect} />,
      size: 'lg'
    })
  }
  
  
  return (
    <ResizeableElement
      block={block}
      defaultWidth={defaultWidth}
    >
      { block.properties?.url ? (
        <div className="aspect-w-16 aspect-h-9 px-1">
          <iframe 
            src={block?.properties?.url} 
            width="640" 
            height="360" 
            frameBorder="0" 
            allow="autoplay; fullscreen; picture-in-picture" 
            allowFullScreen
          />
        </div>
      ) : (
        <div className='text-center'>
          <Button onClick={selectVideoModal}>Choose a video</Button>
        </div>
      )}
    </ResizeableElement>
  );
}

export default VideoBlockEdit