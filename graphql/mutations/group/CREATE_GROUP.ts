import { gql } from '@apollo/client';
import { GroupFragment } from '../../queries/allQueries';

export const CREATE_GROUP = gql`
  mutation CreateGroup(
    $name: String!,
    $parentId: ID,
    $assignedCourseIds: [ID!],
    $enrolledCourseIds: [ID!],
    $userIds: [ID!]
  ) {
    createGroup(
      input: {
        name: $name,
        parentId: $parentId,
        assignedCourseIds: $assignedCourseIds,
        enrolledCourseIds: $enrolledCourseIds,
        userIds: $userIds
      }
    ) {
      group {
        ...GroupFragment
      }
    }
  }
  ${GroupFragment}
`;
