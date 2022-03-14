import cache, { currentContentItemVar } from "../../graphql/cache";
import { ContentFragment } from "../../graphql/queries/allQueries";
import { useEffect, useState } from "react";

export const useContentTitle = () => {

  const { id } = currentContentItemVar()
  
  const [title, setTitle] = useState('')
  
  useEffect(() => {
    if(id) {
      setTitle(cache.readFragment({
        id:`ContentItem:${id}`,
        fragment: ContentFragment,
      }))
    }
  },[id])

  return { title }

}
