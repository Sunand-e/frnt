import { useEffect, useState } from "react";
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
