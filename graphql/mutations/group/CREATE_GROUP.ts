import { gql } from '@apollo/client';
import { GroupFragment } from '../../queries/groups';

export const CREATE_GROUP = gql`
  mutation CreateGroup(
    $name: String!,
    $parentId: ID,
    $assignedContentIds: [ID!],
    $enrolledContentIds: [ID!],
    $imageId: ID,
    $userIds: [ID!]
  ) {
    createGroup(
      input: {
        name: $name,
        parentId: $parentId,
        assignedContentIds: $assignedContentIds,
        enrolledContentIds: $enrolledContentIds,
        imageId: $imageId,
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
