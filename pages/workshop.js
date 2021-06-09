import { useState, useRef } from 'react'
import ContentTypePage from "../components/ContentTypePage";
import BlockWithTitle from '../components/BlockWithTitle.js';
import LoadingSpinner from '../components/LoadingSpinner.js';
import VideoPlayer from '../components/VideoPlayer.js';
import DownloadLinks from '../components/DownloadLinks';

export default function Workshop() {

  const [workshop, setWorkshop] = useState('')
  const [playing, setPlaying] = useState(false)

  const player = useRef()

  const handleMarkerClick = (seconds) => {
    player.current.seekTo(seconds)
    player.current.wrapper.scrollIntoView({behavior: "smooth"})
    setPlaying(true)
  }

  return (
    <ContentTypePage type="Workshop" setData={setWorkshop}>
      <div className="flex-grow">
        { workshop ?
          (
            <>
              <VideoPlayer url={workshop.videoUrl} playerRef={player} playing={playing} />
              <div className="mb-8" dangerouslySetInnerHTML={{__html: workshop.content}} />
              <div className="mb-8 w-full shadow-lg bg-main-semitransparent" >
                { workshop.videoMarkers.length && (
                  <>
                    <h3 className="bg-blue text-white p-2 px-4">In this video:</h3>
                      { workshop.videoMarkers.map(marker => (
                        <div className="flex mt-1 items-center cursor-pointer" onClick={() => handleMarkerClick(marker.time)}>
                            <span className="bg-main-dark text-white px-4 py-2">{new Date(marker.time * 1000).toISOString().substr(11, 8)}</span>
                            <span className="bg-white px-4 py-2 flex-grow hover:font-bold ">{marker.title}</span>
                        </div>
                      ) ) }
                  </>
                ) }
              </div>
            </>
          ) : <LoadingSpinner className="transform scale-50"/>
        }
        <BlockWithTitle title="Downloads">
          
          { workshop && <DownloadLinks downloads={workshop.sm_linked_documents} /> }
        </BlockWithTitle>
      </div>
    </ContentTypePage>
  )
}
