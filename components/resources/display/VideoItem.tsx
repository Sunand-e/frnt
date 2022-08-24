import {Trash} from '@styled-icons/heroicons-outline/Trash'

const VideoItem = ({url, onRemove=null}) => {

  const handleRemove = (e) => {
    e.preventDefault()
    onRemove && onRemove(e)
  }

  return (
    <>
      { onRemove && (
        <div className="ml-auto h-7 flex space-x-2">
          <Trash className={`w-4 cursor-pointer`} onClick={handleRemove}/>
        </div>
      )}
      <div className="aspect-w-16 aspect-h-9 px-1 mb-4 ">          
        <iframe
          src={url} 
          width="640" 
          height="360" 
          frameBorder="0" 
          allow="autoplay; fullscreen; picture-in-picture" 
          allowFullScreen
        />
      </div>
    </>
  )
}

export default VideoItem
