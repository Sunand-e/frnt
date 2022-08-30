import { gql } from '@apollo/client';
import { GroupFragment } from '../../queries/groups';


export const UPDATE_GROUP = gql`
  mutation UpdateGroup(
    $id: ID!
    $name: String,
    $parentId: ID,
    $imageId: ID,
    $assignedCourseIds: [ID!],
    $enrolledCourseIds: [ID!],
    $userIds: [ID!]
  ) {
    updateGroup(
      input: {
        name: $name,
        id: $id,
        imageId: $imageId,
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
