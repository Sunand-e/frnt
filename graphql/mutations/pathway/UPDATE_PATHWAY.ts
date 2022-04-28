import { gql } from '@apollo/client';
import { PathwayFragment } from '../../queries/allQueries';


export const UPDATE_PATHWAY = gql`
  mutation UpdatePathway(
    $id: ID!
    $title: String,
    $content: JSON,
    $certificateProperties: JSON,
    $settings: JSON,
    $tags: [TagInput!],
    $imageId: ID,
    $imageUrl: String,
    $childrenIds: JSON,
    $prerequisites: JSON
  ) {
    updatePathway(
      input: {
        id: $id,
        title: $title,
        content: $content,
        certificateProperties: $certificateProperties,
        settings: $settings,
        tags: $tags,
        imageId: $imageId,
        imageUrl: $imageUrl
        childrenIds: $childrenIds,
        prerequisites: $prerequisites
      }
    ) {
      pathway {
      ...PathwayFragment
      }
    }
  }
  ${PathwayFragment}
`;
