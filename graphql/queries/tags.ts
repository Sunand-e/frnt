import { gql } from '@apollo/client';

export const TagFragment = gql`
  fragment TagFragment on Tag {
    id
    label
    tagType
    order
    image {
      location
      id
      altText
      properties
      title
    }
    _deleted @client
  }
`

export const GET_TAG = gql`
  query GetTag($id: ID!) {
    tag(id: $id) {
      ...TagFragment
    }
  }
  ${TagFragment}
`
export const GET_TAGS = gql`
  query GetTags {
    tags {
      ...TagFragment
    }
  }
  ${TagFragment}
`
export const GET_TAGS_FULL = gql`
  query GetTagsFull {
    tags {
      ...TagFragment
      courses {
        edges {
          node {
            id
          }
        }
      }
      resources {
        edges {
          node {
            id
          }
        }
      }
    }
  }
  ${TagFragment}
`
