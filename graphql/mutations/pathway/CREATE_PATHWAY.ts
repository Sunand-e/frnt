import { gql } from '@apollo/client';


export const CREATE_PATHWAY = gql`
  mutation CreatePathway(
    $title: String!,
    $content: JSON,
    $certificateProperties: JSON,
    $certificateTemplateId: ID,
    $childrenIds: JSON,
    $settings: JSON,
    $tags: [TagInput!],
    $imageId: ID,
    $imageUrl: String,
  ) {
    createPathway(
      input: {
        title: $title,
        content: $content,
        certificateProperties: $certificateProperties,
        certificateTemplateId: $certificateTemplateId,
        childrenIds: $childrenIds,
        settings: $settings,
        tags: $tags,
        imageId: $imageId,
        imageUrl: $imageUrl
      }
    ) {
      pathway {
        id
      }
    }
  }
`;
