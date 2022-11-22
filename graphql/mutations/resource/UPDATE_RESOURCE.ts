import { gql } from '@apollo/client';
import { ResourceFragment } from '../../queries/allQueries';


export const UPDATE_RESOURCE = gql`
  mutation UpdateResource(
    $id: ID!
    $title: String,
    $content: JSON,
    $settings: JSON,
    $imageId: ID,
    $mediaItemId: ID,
    $tags: [TagInput!],
    $iconId: ID
  ) {
    updateResource(
      input: {
        id: $id,
        title: $title,
        content: $content,
        settings: $settings,
        imageId: $imageId
        mediaItemId: $mediaItemId
        tags: $tags,
        iconId: $iconId
      }
    ) {
      resource {
        ...ResourceFragment
      }
    }
  }
  ${ResourceFragment}
`;
