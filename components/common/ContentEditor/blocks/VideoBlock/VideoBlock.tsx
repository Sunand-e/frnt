export const VideoBlock = ({block}) => {

  const width = block?.properties?.width || '50%';

  return (
    <div 
      className="aspect-video px-1 mx-auto"
      style={{width}}
    >

      <iframe 
        src={block?.properties?.url} 
        className="w-full h-full"
        // width="640"
        // height="360" 
        frameBorder="0" 
        allow="autoplay; fullscreen; picture-in-picture" 
        allowFullScreen
      />
    </div>
  );
}

export default VideoBlock