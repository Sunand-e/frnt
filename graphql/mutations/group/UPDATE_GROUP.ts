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
