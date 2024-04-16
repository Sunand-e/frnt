import { gql, useFragment } from "@apollo/client";
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
  return useFragment<LessonContentFragmentFragment, any>({
    fragment: LessonContentFragment,
    from: {
      __typename: "ContentItem",
      id,
    },
  });
}
