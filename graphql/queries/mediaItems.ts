import { gql } from "@apollo/client"

export const MediaItemFragment = gql`
  fragment MediaItemFragment on MediaItem {
    id
    mediaType
    fileSize
    fileName
    location
    properties
    altText
    createdAt
    deletedAt
  }
`

export const GET_MEDIA_ITEMS = gql`
  query GetMediaItems(
    $where: JSON,
  ) {  
    mediaItems(where: $where) {
      ...MediaItemFragment
    }
  }
  ${MediaItemFragment}
` 

export const GET_MEDIA_ITEM = gql`
  query GetMediaItem(
    $id: String,
  ) {  
    mediaItem(id: $id) {
      ...MediaItemFragment
    }
  }
  ${MediaItemFragment}
` 

