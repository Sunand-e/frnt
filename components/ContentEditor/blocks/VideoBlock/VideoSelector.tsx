import {
  FunctionComponent, useContext, useEffect, useState
} from 'react';
import { v4 as uuidv4 } from 'uuid';
import urlParser from "js-video-url-parser";
import InputWithLabel from '../../../common/inputs/InputWithLabel';
import Button from '../../../Button';
import { ModalContext } from '../../../../context/modalContext';

export const VideoSelector = ({onAddVideo}) => {


  const  defaultWidth = '50%';
  const [videoUrl, setVideoUrl] = useState('')
  const [embedUrl, setEmbedUrl] = useState('')

  useEffect(() => {
    console.log()
    const video = urlParser.parse(videoUrl);
    const newEmbedUrl = urlParser.create({
      videoInfo: video,
      format: 'embed',
    });

    setEmbedUrl(newEmbedUrl)
  },[videoUrl])
  
  return (
    <>
      <InputWithLabel 
        onChange={(e) => setVideoUrl(e.target.value)} 
        label="Video URL"
        value={videoUrl}
        name="videoUrl"
        placeholder="Enter video URL..."
      />
      {/* <input onChange={(e) => setVideoUrl(e.target.value)} value={videoUrl} /> */}
      { embedUrl && (
        <>
          <label className="block text-gray-500 text-sm font-bold mb-2">
            Preview:
          </label>
          <div className="aspect-w-16 aspect-h-9 px-1 mb-4 ">          
            <iframe
              src={embedUrl} 
              width="640" 
              height="360" 
              frameBorder="0" 
              allow="autoplay; fullscreen; picture-in-picture" 
              allowFullScreen
            />
          </div>
        </>
      )}
      <div className="flex justify-end">
      { embedUrl && <Button className="ml-2" onClick={onAddVideo}>Add Video</Button> }
      </div>
    </>
  );
}

export default VideoSelector