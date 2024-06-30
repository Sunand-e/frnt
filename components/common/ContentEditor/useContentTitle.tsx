import { useEffect, useState } from "react";
import { gql, useFragment, useReactiveVar } from "@apollo/client";
import { ContentTitleFragment } from "../../courses/SidebarSection";

export const useContentTitle = (id) => {

  const [title, setTitle] = useState('')

  const { complete, data } = useFragment({
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
