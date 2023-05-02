import {
  FunctionComponent
} from 'react';
import AudioPlayer from '../../../audio/AudioPlayer';
// import urlParser from "js-audio-url-parser";

export const AudioBlock: FunctionComponent = ({block}) => {

  const url = block?.properties?.file?.location

  return (
    <AudioPlayer url={url} />
  );
}

export default AudioBlock