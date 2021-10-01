import { gql } from '@apollo/client';
import { SectionFragment } from '../../queries/allQueries';


export const CREATE_SECTION = gql`
  mutation CreateSection(
    $title: String!,
    $content: JSON,
    $childrenIds: JSON, 
    $parentIds: JSON, 
    $prerequisites: JSON
  ) {
    createSection(
      input: {
        title: $title,
        content: $content,
        childrenIds: $childrenIds,
        parentIds: $parentIds,
        prerequisites: $prerequisites
      }
    ) {
      section {
        ...SectionFragment
      }
      message
    }
  }
  ${SectionFragment}
`;
