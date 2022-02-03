import { createPlugins, Plate, createSingleLinePlugin } from "@udecode/plate-headless";
import cache, { currentContentItemVar } from "../../graphql/cache";
import { ContentFragment } from "../../graphql/queries/allQueries";

import { useDebouncedCallback } from 'use-debounce';
import { useEffect, useState } from "react";

export const useContentTitle = () => {

  const { id, updateTitleFunction } = currentContentItemVar()
  
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
