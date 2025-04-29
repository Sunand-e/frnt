import { GetUsersQuery } from "../../graphql/generated";

export const userResponseData: GetUsersQuery = {

  users: {
    totalCount: 22,
    pageInfo: {
      __typename: "PageInfo",
      endCursor: null,
      hasNextPage: true,
    },
    edges: [
      {
        node: {
          createdAt: "2022-11-29T15:43:13Z",
          email: "aflinch@example.com",
          firstName: "Adrian",
          fullName: "Adrian Flinch",
          id: "8385e59b-e026-4227-8050-a88c9f232384",
          lastName: "Flinch",
          status: "active",
          updatedAt: "2022-11-29T15:43:13Z",
          userType: null,
          profileImageUrl: null,
          invitationSentAt: null,
          invitationAcceptedAt: null,
          currentSignInAt: null,
          mfaEnabled: false,
          phoneNumber: null,
          countryCode: null,
          nationalNumber: null,
          otpSecretVerified: false,
          isActive: false,
          unconfirmedEmail: null,
          _deleted: false,

          roles: [
            {
              id: "77cb0f41-e222-4d36-85b0-0bbf7d6696fd",
              name: "Learner",
              roleType: "tenant_role",
              __typename: "Role"
            }
          ],
          __typename: "User",
          groups: {
            totalCount: 3,
            edges: [
              {
                groupId: "73036bca-3b29-44f0-9f87-999f2dd99e55",
                userId: "8385e59b-e026-4227-8050-a88c9f232384",
                node: {
                  id: "73036bca-3b29-44f0-9f87-999f2dd99e55",
                  name: "Test",
                  __typename: "Group"
                },
                roles: [
                  {
                    id: "7f84184e-ec0f-40d4-8b72-4239ac2e329b",
                    name: "Group Leader",
                    __typename: "Role"
                  }
                ],
                __typename: "UserGroupEdge"
              },
              {
                groupId: "5afffaeb-9424-4a5f-ab88-ff415c55a563",
                userId: "8385e59b-e026-4227-8050-a88c9f232384",
                node: {
                  id: "5afffaeb-9424-4a5f-ab88-ff415c55a563",
                  name: "Org-4",
                  __typename: "Group"
                },
                roles: [
                  {
                    id: "4ec7cec7-b0bf-4495-9612-af8ad4970289",
                    name: "Member",
                    __typename: "Role"
                  }
                ],
                __typename: "UserGroupEdge"
              },
              {
                groupId: "84f10d90-6800-42e5-b33e-882ceeedb671",
                userId: "8385e59b-e026-4227-8050-a88c9f232384",
                node: {
                  id: "84f10d90-6800-42e5-b33e-882ceeedb671",
                  name: "new group to test",
                  __typename: "Group"
                },
                roles: [
                  {
                    id: "7f84184e-ec0f-40d4-8b72-4239ac2e329b",
                    name: "Group Leader",
                    __typename: "Role"
                  }
                ],
                __typename: "UserGroupEdge"
              }
            ],
            __typename: "UserGroupConnection"
          }
        },
        __typename: "ContentUserEdge"

      },
      {
        node: {
          createdAt: "2025-04-18T11:58:46Z",
          email: "dev@12gmail.com",
          firstName: "dev",
          fullName: "dev test",
          id: "cfe201cc-9f91-41db-8b9a-0c3e3f572520",
          lastName: "test",
          status: "active",
          updatedAt: "2025-04-18T11:58:46Z",
          userType: null,
          profileImageUrl: null,
          invitationSentAt: null,
          invitationAcceptedAt: null,
          currentSignInAt: null,
          mfaEnabled: false,
          phoneNumber: null,
          countryCode: null,
          nationalNumber: null,
          otpSecretVerified: false,
          isActive: false,
          unconfirmedEmail: null,
          _deleted: false,
          roles: [
            {
              id: "77cb0f41-e222-4d36-85b0-0bbf7d6696fd",
              name: "Learner",
              roleType: "tenant_role",
              __typename: "Role"
            }
          ],
          __typename: "User",
          groups: {
            totalCount: 1,
            edges: [
              {
                groupId: "6b6fee3f-66d1-4605-8d74-75df13c00818",
                userId: "cfe201cc-9f91-41db-8b9a-0c3e3f572520",
                node: {
                  id: "6b6fee3f-66d1-4605-8d74-75df13c00818",
                  name: "Environmental org",
                  __typename: "Group"
                },
                roles: [
                  {
                    id: "7f84184e-ec0f-40d4-8b72-4239ac2e329b",
                    name: "Group Leader",
                    __typename: "Role"
                  }
                ],
                __typename: "UserGroupEdge"
              }
            ],
            __typename: "UserGroupConnection"
          }
        },
        __typename: "ContentUserEdge"
      },
      {
        node: {
          createdAt: "2025-04-24T07:58:27Z",
          email: "devin@gmail.com",
          firstName: "devin",
          fullName: "devin rey",
          id: "59644ffe-d84e-4d6a-93e8-9a023a6630c2",
          lastName: "rey",
          status: "active",
          updatedAt: "2025-04-24T07:58:27Z",
          userType: null,
          profileImageUrl: null,
          invitationSentAt: null,
          invitationAcceptedAt: null,
          currentSignInAt: null,
          mfaEnabled: false,
          phoneNumber: null,
          countryCode: null,
          nationalNumber: null,
          otpSecretVerified: false,
          isActive: false,
          unconfirmedEmail: null,
          _deleted: false,
          roles: [
            {
              id: "77cb0f41-e222-4d36-85b0-0bbf7d6696fd",
              name: "Learner",
              roleType: "tenant_role",
              __typename: "Role"
            }
          ],
          __typename: "User",
          groups: {
            totalCount: 0,
            edges: [],
            __typename: "UserGroupConnection"
          }
        },
        __typename: "ContentUserEdge"

      }
    ]
  }
}

