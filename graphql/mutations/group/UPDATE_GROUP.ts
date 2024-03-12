import { gql } from '@apollo/client';
import { GroupFragment } from '../../queries/groups';


export const UPDATE_GROUP = gql`
  mutation UpdateGroup(
    $id: ID!
    $name: String,
    $parentId: ID,
    $imageId: ID,
    $assignedContentIds: [ID!],
    $enrolledContentIds: [ID!],
    $availableContentIds: [ID!],
    $userIds: [ID!]
  ) {
    updateGroup(
      input: {
        name: $name,
        id: $id,
        imageId: $imageId,
        parentId: $parentId,
        availableContentIds: $availableContentIds,
        assignedContentIds: $assignedContentIds,
        enrolledContentIds: $enrolledContentIds,
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
