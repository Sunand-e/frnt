import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { useDebouncedCallback } from "use-debounce";
import { Trash } from '@styled-icons/heroicons-outline/Trash'
import LoadingSpinner from "./LoadingSpinner";

const LinkPreview = ({ setValidUrl = null, url = null, onRemove = null }) => {

  const abortController = useRef(null)
  const [error, setError] = useState(null)
  const [link, setLink] = useState(null)
  const [isLoading, setLoading] = useState(false);
  const [imageUrl, setimageUrl] = useState();

  const getUrlMetadata = useDebouncedCallback(async () => {
    abortController.current?.abort()
    abortController.current = new AbortController()
    setLoading(true);

    await axios.request({
      method: 'GET',
      url: `/api/v1/generate_meta_data?url=${url}`,
      signal: abortController.current?.signal
    }).then(data => {
      setLoading(false);
      if (data.status !== 200) {
        setError('Something went wrong')
        setValidUrl && setValidUrl(null)
      } else if (data?.data?.error) {
        setError(data?.data?.error)
        setValidUrl && setValidUrl(null)
      } else {
        setError(null)
        setLink(data?.data)
        setValidUrl && setValidUrl(data?.data?.url)
      }
    })
  }, 600)

  const fetchScreenshot = async () => {
    const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(
      url
    )}&screenshot=true`;

    await axios.request({
      method: 'GET',
      url: apiUrl
    }).then(data => {
      if (data.status == 200) {
        setimageUrl(data?.data?.lighthouseResult?.audits?.['final-screenshot']?.details?.data)
      }
    }).catch(() => { });
  };

  useEffect(() => {
    getUrlMetadata();
    fetchScreenshot();
    return () => abortController.current?.abort()
  }, [url]);

  useEffect(() => {
    setimageUrl(link?.meta_tags?.property?.['og:image'] ||
      link?.images?.find(
        (image: string) =>
          image &&
          !image.startsWith('https://www.facebook.com/tr?') &&
          !image.startsWith('https://sb.scorecardresearch.com/p?')
      ))
  }, [link]);

  return (
    <>
      {onRemove && (
        <div className="ml-auto h-7 flex space-x-2">
          <Trash className={`w-4 cursor-pointer`} onClick={onRemove} />
        </div>
      )}

      {!isLoading && (link && !error ? (
        <div className="w-full mx-auto overflow-hidden mb-8 bg-white shadow rounded-md sm:max-w-screen-lg ">
          <div className="flex flex-row space-y-0 bg-white h-56 items-stretch">
            <a href={link.url} target="_blank" className="w-1/2 p-6 flex items-center">
              <img
                className="object-cover w-full"
                src={imageUrl ?? "/images/placeholder-image.png"}
                alt="Preview"
              />
            </a>

            <div className="flex w-1/2 bg-main-superlight items-center">
              <div className="flex flex-col p-6 space-y-1 bg-main-superlight">
                <a
                  href={link.url} target="_blank"
                  className="m-0 text-lg leading-tight text-gray-900 no-underline hover:no-underline hover:text-gray-900 sm:text-xl"
                >
                  {link.best_title}
                </a>
                <p className="text-gray-500">{link.root_url}</p>
                <p className="text-sm">{link.best_description}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          {error && (
            <p>No link preview available. Link may be invalid.</p>
          )}
        </>
      ))}

      {isLoading && <LoadingSpinner className='mt-12' text="Loading Preview" />}
    </>
  )
}

export default LinkPreview;
