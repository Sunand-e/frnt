import ResizeableElement from '../common/ResizeableElement';
import Button from '../../../Button';
import useBlockEditor from '../../useBlockEditor';
import VideoUrlSelect from './VideoUrlSelect';
import { closeModal, handleModal } from '../../../../../stores/modalStore';
import { useBlockStore } from '../../useBlockStore';
import { useEditorViewStore } from '../../useEditorViewStore';
import { useEffect, useRef, useState } from 'react';

export const VideoBlockEdit = ({block}) => {

  const updateBlock = useBlockStore(state => state.updateBlock)

  const  defaultWidth = '50%';

  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [iframeFocused, setIframeFocused] = useState(false)

  useEffect(() => {
    const monitor = setInterval(function(){
      const elem = document.activeElement;
      if(elem && elem === iframeRef.current) {
        if(iframeFocused === false) {
          setIframeFocused(true)
          useBlockStore.setState({
            activeBlockId: block.id
          })
          useEditorViewStore.setState({
            activeSettingsPanel: 'block'
          })
        }
      } else {
        setIframeFocused(false)
      }
    }, 100);

    return () => {
      clearInterval(monitor);
    };
  },[block])

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
        <div className="aspect-video px-1">
          <iframe 
            ref={iframeRef}
            src={block?.properties?.url} 
            className="w-full h-full"
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