import urlParser from "js-video-url-parser";
import { useEffect, useState } from "react";

const useGetImageSrc = (item) => {
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    if (item?.image?.id) {
      setImageSrc(`/uploaded_images/${item.image.id}?w=300`);
    } else if (item?.contentType === "video") {
      const { id, provider } = urlParser.parse(item?.content?.url);
      switch (provider) {
        case "youtube": {
          setImageSrc(`https://img.youtube.com/vi/${id}/mqdefault.jpg`);
        }
        case "vimeo": {
          fetch(`https://vimeo.com/api/oembed.json?url=${item?.content?.url}`)
            .then((data) => {
              return data.json();
            })
            .then((video) => {
              setImageSrc(video.thumbnail_url);
            });
        }
      }
    }
  }, [item]);

  return {
    imageSrc,
  };
};

export default useGetImageSrc;
