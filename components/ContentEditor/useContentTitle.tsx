import cache, { currentContentItemVar } from "../../graphql/cache";
import { ContentFragment } from "../../graphql/queries/allQueries";
import { useCallback, useEffect, useState } from "react";
import { ContentFragment as ContentFragmentType } from "../../graphql/queries/__generated__/ContentFragment";
import { useReactiveVar } from "@apollo/client";

export const useContentTitle = () => {

  const currentContentItem = useReactiveVar(currentContentItemVar)

  const [title, setTitle] = useState('')
  useEffect(() => {

    const { title } = cache.readFragment<ContentFragmentType>({
      id:`ContentItem:${currentContentItem.id}`,
      fragment: ContentFragment,
      optimistic: true
    })
    setTitle(title)
  }, [currentContentItem.id])



  return { title }
}
