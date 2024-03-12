import { gql } from '@apollo/client';
import { GroupFragment } from '../../queries/groups';

export const CREATE_GROUP = gql`
  mutation CreateGroup(
    $name: String!,
    $parentId: ID,
    $assignedContentIds: [ID!],
    $enrolledContentIds: [ID!],
    $isOrganisation: Boolean,
    $imageId: ID,
    $userIds: [ID!]
  ) {
    createGroup(
      input: {
        name: $name,
        parentId: $parentId,
        assignedContentIds: $assignedContentIds,
        enrolledContentIds: $enrolledContentIds,
        isOrganisation: $isOrganisation,
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
