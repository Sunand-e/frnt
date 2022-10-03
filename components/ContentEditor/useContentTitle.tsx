import cache, { currentContentItemVar } from "../../graphql/cache";
import { ContentFragment } from "../../graphql/queries/allQueries";
import { useCallback, useEffect, useState } from "react";
import { ContentFragment as ContentFragmentType } from "../../graphql/queries/__generated__/ContentFragment";
import { gql, useFragment_experimental, useReactiveVar } from "@apollo/client";

const ContentTitleFragment = gql`
  fragment ContentTitleFragment on ContentItem {
    title
  }
`

export const useContentTitle = () => {

  const { id } = useReactiveVar(currentContentItemVar)

  const [title, setTitle] = useState('')


  const { complete, data } = useFragment_experimental({
    fragment: ContentTitleFragment,
    from: {
      __typename: "ContentItem",
      id: id,
    },
  });

  useEffect(() => {
    data.title && setTitle(data.title)
  }, [data.title])

  return { title }
}
