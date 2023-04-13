import { gql, useFragment_experimental } from "@apollo/client";
import { LessonContentFragmentFragment } from "../../graphql/generated";

const LessonContentFragment = gql`
  fragment LessonContentFragment on ContentItem {
    title
    content
    contentType
    itemType
  }
`

export const useLessonContentFragment = (id) => {
  return useFragment_experimental<LessonContentFragmentFragment, any>({
    fragment: LessonContentFragment,
    from: {
      __typename: "ContentItem",
      id,
    },
  });
}
