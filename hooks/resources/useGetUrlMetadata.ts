import axios from "axios";
import urlParser from "js-video-url-parser";
import { useEffect, useRef, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

const useGetUrlMetadata = (url, setValidUrl) => {
  const cancelTokenSource = useRef(null)
  const [error, setError] = useState(null)
  const [link, setLink] = useState(null)
  
  const getUrlMetadata = useDebouncedCallback(async () => {
  
    cancelTokenSource.current?.cancel()
    cancelTokenSource.current = axios.CancelToken.source()
  
    await axios.request({
      method: 'GET',
      url: `/api/v1/generate_meta_data?url=${url}`,
      cancelToken: cancelTokenSource.current.token
    }).then(data => {
      if(data.status !== 200 ) {
        setError('Something went wrong')
        setValidUrl && setValidUrl(null)
      } else if(data?.data?.error) {
        setError(data?.data?.error)
        setValidUrl && setValidUrl(null)
      } else {
        setError(null)
        setLink(data?.data)
        setValidUrl && setValidUrl(url)
      }
    })
  },600)
  
  useEffect(() => {
    getUrlMetadata()
  },[url])

  return {
    link,
    error
  };
};

export default useGetUrlMetadata;
