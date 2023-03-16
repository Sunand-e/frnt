import cache, { currentContentItemVar } from "../../../graphql/cache";
import { ContentFragment } from "../../../graphql/queries/allQueries";
import { useCallback, useEffect, useState } from "react";
import { ContentFragment as ContentFragmentType } from "../../../graphql/queries/__generated__/ContentFragment";
import { gql, useFragment_experimental, useReactiveVar } from "@apollo/client";
import { ContentTitleFragment } from "../../courses/SidebarSection";

export const useContentTitle = (id) => {

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
