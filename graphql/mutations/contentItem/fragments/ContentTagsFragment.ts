import { gql } from "@apollo/client";

export const ContentTagsFragment = gql`
  fragment ContentTagsFragment on ContentItem {
    id
    tags {
      edges {
        id
        contentItemId
        node {
          id
        }
      }
    }
  }
`