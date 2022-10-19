import { gql } from '@apollo/client';
import { ResourceFragment } from '../../queries/allQueries';


export const CREATE_RESOURCE = gql`
  mutation CreateResource(
    $title: String,
    $contentType: String 
    $content: JSON,
    $settings: JSON,
    $imageId: ID,
    $mediaItemId: ID,
    $iconId: ID
  ) {

    createResource(
      input: {
        title: $title,
        contentType: $contentType,
        content: $content,
        settings: $settings,
        imageId: $imageId,
        mediaItemId: $mediaItemId,
        iconId: $iconId
      }
    ) {
      resource {
        ...ResourceFragment
      }
      message
    }
  }
  ${ResourceFragment}
`;
