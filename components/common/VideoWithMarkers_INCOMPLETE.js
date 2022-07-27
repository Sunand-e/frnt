import { useState, useRef } from 'react'
import ContentTypePage from "../ContentTypePage";
import BlockWithTitle from '../BlockWithTitle';
import LoadingSpinner from '../LoadingSpinner';
import VideoPlayer from '../VideoPlayer';
import DownloadLinks from '../DownloadLinks';

const Webinar = () => {

  const [webinar, setWebinar] = useState('');
  const [playing, setPlaying] = useState(false)

  const player = useRef()

  const handleMarkerClick = (seconds) => {
    player.current.seekTo(seconds)
    player.current.wrapper.scrollIntoView()
    setPlaying(true)
  }
  return (
    <>
      { webinar && (
        <>
          <VideoPlayer url={webinar.videoUrl} playerRef={player} playing={playing} />
          <div className="mb-8" dangerouslySetInnerHTML={{__html: webinar.content}} />
          <div className="mb-8 w-full shadow-lg bg-main-semitransparent" >
            { webinar.videoMarkers.length && (
              <>
                <h3 className="bg-blue text-white p-2 px-4">In this video:</h3>
                  { webinar.videoMarkers.map(marker => (
                    <div className="flex mt-1 items-center cursor-pointer" onClick={() => handleMarkerClick(marker.time)}>
                        <span className="bg-main-secondary text-white px-4 py-2">{new Date(marker.time * 1000).toISOString().substr(11, 8)}</span>
                        <span className="bg-white px-4 py-2 flex-grow hover:font-bold ">{marker.title}</span>
                    </div>
                  ) ) }
              </>
            ) }
          </div>
        </>
      )}
      <BlockWithTitle title="Downloads">
        { !webinar && <LoadingSpinner className="transform scale-50"/> }
        { webinar && <DownloadLinks downloads={webinar.smLinkedDocuments} /> }
      </BlockWithTitle>
    </>
  )
}

export default Webinar
