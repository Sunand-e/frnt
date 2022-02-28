import { gql } from '@apollo/client';


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
`;
