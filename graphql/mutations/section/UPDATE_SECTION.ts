import { gql } from '@apollo/client';
import { SectionFragment } from '../../queries/allQueries';


export const UPDATE_SECTION = gql`
  mutation UpdateSection(
    $id: ID!
    $title: String,
    $content: JSON,
    $childrenIds: JSON,
    $prerequisites: JSON
  ) {
    updateSection(
      input: {
        id: $id,
        title: $title,
        content: $content,
        childrenIds: $childrenIds,
        prerequisites: $prerequisites
      }
    ) {
      section {
        ...SectionFragment
      }
    }
  }
  ${SectionFragment}
`;
