import { useEffect, useState } from 'react';
import urlParser from "js-video-url-parser";
import InputWithLabel from './InputWithLabel';
import Button from '../Button';
import VideoItem from '../../resources/display/VideoItem';

export const VideoSelector = ({onAddVideo}) => {

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
          <VideoItem url={embedUrl} />
        </>
      )}
      <div className="flex justify-end">
      { embedUrl && <Button className="ml-2" onClick={() => onAddVideo(embedUrl)}>Add Video</Button> }
      </div>
    </>
  );
}

export default VideoSelector