import {
  FunctionComponent, useEffect, useState
} from 'react';
import ResizeableElement from '../common/ResizeableElement';
import urlParser from "js-video-url-parser";

export const VideoBlockEdit: FunctionComponent = ({block}) => {

  const  defaultWidth = '50%';
  const [videoUrl, setVideoUrl] = useState('')
  useEffect(() => {
    const video = urlParser.parse('https://www.youtube.com/channel/UCzQUP1qoWDoEbmsQxvdjxgQ');
    const embedUrl = urlParser.create({
      videoInfo: video,
      format: 'embed',
    });

  })
  
  return (
    <ResizeableElement
      block={block}
      defaultWidth={defaultWidth}
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

export default VideoBlockEdit