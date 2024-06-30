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
    $enrolmentLicenseTotal: Int,
    $enrolments: Int,
    $userIds: [ID!]
  ) {
    updateGroup(
      input: {
        name: $name,
        id: $id,
        imageId: $imageId,
        parentId: $parentId,
        enrolmentLicenseTotal: $enrolmentLicenseTotal,
        enrolments: $enrolments,
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
