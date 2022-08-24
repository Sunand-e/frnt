import ReactPlayer from "react-player";
import { CloseOutline } from '@styled-icons/evaicons-outline/CloseOutline'

const AudioPlayer = ({url, onClose=null}) => {

  return (
    <div className="flex">
      <ReactPlayer
        url={url}
        controls 
        width='100%'
        height={50}
      />
      { onClose && (
        <div className="h-[50px] p-[0.6em] -ml-2">
          <button className="h-full flex items-center hover:bg-gray-500/10 rounded-full">
            <CloseOutline className="h-full text-red-700" onClick={onClose} />
          </button>
        </div>
      )}
    </div>
  )
}

export default AudioPlayer