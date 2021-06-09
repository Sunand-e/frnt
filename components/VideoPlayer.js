import { useRef } from 'react'
import ReactPlayer from 'react-player'

export default function VideoPlayer({url, playerRef, playing}) {

  return (
    <div className="relative mb-8" style={{
      position: 'relative',
      paddingTop: '56.25%'
    }}>
      <ReactPlayer
        ref={playerRef}
        playing={playing}
        width='100%'
        height='100%'
        style={{
          position: 'absolute',
          top: 0,
          left: 0
        }}
        url={url}
        controls={true}
      />
    </div>
  )

}
