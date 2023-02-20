import urlParser from "js-video-url-parser";
import { useEffect, useState } from "react";

const useGetThumbnail = (item, width=300) => {
  const [src, setSrc] = useState(null);

  useEffect(() => {
    if (item?.image?.id) {
      setSrc(`/uploaded_images/${item.image.id}?w=${width}`);
    } else if (item?.contentType === "video") {
      const videoData = urlParser.parse(item?.content?.url);
      switch (videoData.provider) {
        case "youtube": {
          setSrc(`https://img.youtube.com/vi/${videoData.id}/mqdefault.jpg`);
        }
        break;
        case "vimeo": {
          fetch(`https://vimeo.com/api/oembed.json?url=${item?.content?.url}`)
            .then((data) => {
              return data.json();
            })
            .then((video) => {
              setSrc(video.thumbnail_url);
            });
        }
        break;
      }
    }
  }, [item]);

  return {
    src,
  };
};

export default useGetThumbnail;
