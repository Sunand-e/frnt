import {
  FunctionComponent, useEffect, useState
} from 'react';
import ResizeableElement from '../common/ResizeableElement';
import urlParser from "js-video-url-parser";

export const VideoBlock: FunctionComponent = ({block}) => {

  return (
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
  );
}

export default VideoBlock