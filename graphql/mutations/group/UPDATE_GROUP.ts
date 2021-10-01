import { gql } from '@apollo/client';
import { GroupFragment } from '../../queries/allQueries';


export const UPDATE_GROUP = gql`
  mutation UpdateGroup(
    $id: ID!
    $name: String,
    $parentId: ID
  ) {
    updateGroup(
      input: {
        name: $name,
        id: $id
        parentId: $parentId
      }
    ) {
      group {
      ...GroupFragment
      }
    }
  }
  ${GroupFragment}
`;
