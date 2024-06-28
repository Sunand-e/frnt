import { gql } from '@apollo/client';
import { GroupDetailsFragment } from '../../queries/groups';

export const CREATE_GROUP = gql`
  mutation CreateGroup(
    $name: String!,
    $parentId: ID,
    $assignedContentIds: [ID!],
    $provisionedContentIds: [ID!],
    $isOrganisation: Boolean,
    $imageId: ID,
    $userIds: [ID!]
  ) {
    createGroup(
      input: {
        name: $name,
        parentId: $parentId,
        assignedContentIds: $assignedContentIds,
        provisionedContentIds: $provisionedContentIds,
        isOrganisation: $isOrganisation,
        imageId: $imageId,
        userIds: $userIds
      }
    ) {
      group {
        ...GroupDetailsFragment
      }
    }
  }
  ${GroupDetailsFragment}
`;
