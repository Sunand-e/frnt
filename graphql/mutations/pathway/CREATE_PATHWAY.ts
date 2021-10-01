import { gql } from '@apollo/client';


export const CREATE_PATHWAY = gql`
  mutation CreatePathway(
    $title: String!,
    $content: JSON,
    $certificateProperties: JSON,
    $certificateTemplateId: ID,
    $childrenIds: JSON,
    $imageId: ID,
    $iconId: ID
  ) {
    createPathway(
      input: {
        title: $title,
        content: $content,
        certificateProperties: $certificateProperties,
        certificateTemplateId: $certificateTemplateId,
        childrenIds: $childrenIds,
        imageId: $imageId,
        iconId: $iconId
      }
    ) {
      pathway {
        id
      }
    }
  }
`;
