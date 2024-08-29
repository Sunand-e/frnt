import { gql } from '@apollo/client';
import { GroupDetailsFragment } from '../../queries/groups';


export const UPDATE_GROUP = gql`
  mutation UpdateGroup(
    $id: ID!
    $name: String,
    $parentId: ID,
    $imageId: ID,
    $assignedContentIds: [ID!],
    $provisionedContentIds: [ID!],
    $availableContentIds: [ID!],
    $creditTotal: Int,
    $creditsUsed: Int,
    $userIds: [ID!]
  ) {
    updateGroup(
      input: {
        name: $name,
        id: $id,
        imageId: $imageId,
        parentId: $parentId,
        creditTotal: $creditTotal,
        creditsUsed: $creditsUsed,
        assignedContentIds: $assignedContentIds,
        provisionedContentIds: $provisionedContentIds,
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
