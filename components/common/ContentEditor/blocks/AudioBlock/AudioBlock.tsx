import {
  FunctionComponent, useEffect, useState
} from 'react';
// import urlParser from "js-audio-url-parser";

export const AudioBlock: FunctionComponent = ({block}) => {

  return (
    <div className="aspect-video px-1">
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

export default AudioBlock