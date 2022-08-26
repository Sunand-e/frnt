import { useEffect, useRef, useState } from "react"
import { useInViewRef } from "rooks"


const MediaImageThumb = ({item}) => {

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
    loaded && item?.location && (imgRef.current.src = item?.location)
  },[item,loaded])

  return (
    <div ref={callbackRef}>
      <img ref={imgRef} src="/images/placeholder-image.png" data-src={`${item.location}`} alt="" className="object-cover pointer-events-none group-hover:opacity-75" />
    </div>
  )
}

export default MediaImageThumb