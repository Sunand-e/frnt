import {
  FunctionComponent, useContext, useEffect, useState
} from 'react';
import { v4 as uuidv4 } from 'uuid';
import urlParser from "js-video-url-parser";
import InputWithLabel from '../../../inputs/InputWithLabel';
import Button from '../../../Button';
import { closeModal } from '../../../../../stores/modalStore';

export const VideoUrlSelect = ({onVideoSelect}) => {

  const  defaultWidth = '50%';
  const [videoUrl, setVideoUrl] = useState('')
  const [embedUrl, setEmbedUrl] = useState('')

  useEffect(() => {
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
          <div className="aspect-video mb-4">          
            <iframe
              src={embedUrl} 
              className="w-full h-full"
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
      <Button onClick={() => closeModal()}>Cancel</Button>
      { embedUrl && <Button className="ml-2" onClick={(e) => onVideoSelect(embedUrl)}>Add Video</Button> }
      </div>
    </>
  );
}

export default VideoUrlSelect