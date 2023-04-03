import { gql, useFragment_experimental } from "@apollo/client";

const LessonContentFragment = gql`
  fragment LessonContentFragment on ContentItem {
    title
    content
    contentType
  }
`

export const useLessonContentFragment = (id) => {
  return useFragment_experimental<LessonContentFragmentType, any>({
    fragment: LessonContentFragment,
    from: {
      __typename: "ContentItem",
      id,
    },
  });
}
