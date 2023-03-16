import { useEffect, useRef, useState } from "react"
import useInViewRef from "@rooks/use-in-view-ref"


const MediaImageThumb = ({image}) => {

  const imgRef = useRef(null)
  const [callbackRef, inView] = useInViewRef();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if(inView && !loaded) {
      imgRef.current.src = imgRef.current.getAttribute('data-src');
      console.log(imgRef.current)
      setLoaded(true)
    }
  },[inView])

  useEffect(() => {
    loaded && image?.id && (imgRef.current.src = `/uploaded_images/${image?.id}?w=300`)
  },[image,loaded])

  return (
    <div ref={callbackRef} style={{
      backgroundColor: '#dddddd',
    }}>
      <img 
        ref={imgRef} 
        src="/images/placeholder-image.png" 
        data-src={`/uploaded_images/${image?.id}?w=300`} 
        className="object-cover object-center w-full h-full pointer-events-none group-hover:opacity-75" 
        alt="" 
      />
    </div>
  )
}

export default MediaImageThumb