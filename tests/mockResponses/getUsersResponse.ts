import { GetUserQuery, GetUsersQuery } from "../../graphql/generated";

export const ActiveUserResponseData: NonNullable<NonNullable<GetUsersQuery['users']['edges']>[number]> = {
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
    profileImageUrl: '/images/pic-photo.avif',
    invitationSentAt: '2025-04-22T12:08:08Z',
    invitationAcceptedAt: '2025-04-22T12:08:08Z',
    currentSignInAt: '2025-04-22T12:08:08Z',
    mfaEnabled: false,
    phoneNumber: null,
    countryCode: null,
    nationalNumber: null,
    otpSecretVerified: false,
    isActive: true,
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
};

export const InvitedUserResponseData: NonNullable<NonNullable<GetUsersQuery['users']['edges']>[number]> = {
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
    invitationSentAt: "2025-04-24T07:58:27Z",
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
};

export const UninvitedUserResponseData: NonNullable<NonNullable<GetUsersQuery['users']['edges']>[number]> = {
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
};

export const usersResponseData: GetUsersQuery = {
  users: {
    totalCount: 3,
    pageInfo: {
      __typename: "PageInfo",
      endCursor: null,
      hasNextPage: false,
    },
    edges: [
      {
        ...ActiveUserResponseData
      },
      {
        ...InvitedUserResponseData
      },
      {
        ...UninvitedUserResponseData
      }
    ]
  }
};

export const userResponseData: GetUserQuery = {
  user: {
    ...ActiveUserResponseData.node,
    groups: {
      totalCount: 0,
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
              roleType: "group_role",
              __typename: "Role"
            }
          ],
          __typename: "UserGroupEdge"
        }
      ],
      __typename: "UserGroupConnection"
    },
    pathways: {
      totalCount: 1,
      notStartedCount: 1,
      inProgressCount: 0,
      completedCount: 0,
      edges: [
        {
          userId: "8385e59b-e026-4227-8050-a88c9f232384",
          status: null,
          lastVisited: null,
          firstVisited: null,
          createdAt: null,
          updatedAt: null,
          completedAt: null,
          passedAt: null,
          score: null,
          progress: null,
          visits: null,
          properties: {},
          __typename: "UserContentEdge",
          roles: [],
          groups: {
            edges: [
              {
                roles: [
                  {
                    id: "7f84184e-ec0f-40d4-8b72-4239ac2e329b",
                    __typename: "Role"
                  }
                ],
                node: {
                  id: "73036bca-3b29-44f0-9f87-999f2dd99e55",
                  name: "Test",
                  __typename: "Group"
                },
                __typename: "UserGroupEdge"
              }
            ],
            __typename: "UserGroupConnection"
          },
          node: {
            id: "77bb0ed9-d653-47b8-ad11-bc41cb6490df",
            title: "PAth-1",
            order: 876,
            content: {
              blocks: []
            },
            contentType: null,
            itemType: "pathway",
            createdAt: "2025-02-10T06:42:39Z",
            settings: {},
            shared: false,
            image: null,
            icon: null,
            prerequisites: {},
            updatedAt: "2025-02-10T06:42:39Z",
            __typename: "ContentItem",
            _deleted: false,
            _isOptimistic: false,
            tags: {
              edges: [
                {
                  order: 4,
                  contentItemId: "77bb0ed9-d653-47b8-ad11-bc41cb6490df",
                  __typename: "ContentItemTagEdge",
                  node: {
                    id: "b57f9136-6559-4f07-b0ad-5d9c82352764",
                    label: "Inspiring Great",
                    tagType: "category",
                    __typename: "Tag"
                  }
                }
              ],
              __typename: "ContentItemTagConnection"
            },
            users: {
              totalCount: 0,
              __typename: "ContentUserConnection"
            }
          }
        }
      ],
    },
    courses: {
      totalCount: 1,
      notStartedCount: 1,
      inProgressCount: 0,
      completedCount: 0,
      edges: [
        {
          userId: "8385e59b-e026-4227-8050-a88c9f232384",
          status: null,
          lastVisited: null,
          firstVisited: null,
          createdAt: null,
          updatedAt: null,
          completedAt: null,
          passedAt: null,
          score: null,
          progress: null,
          visits: null,
          __typename: "UserContentEdge",
          roles: [
            {
              id: "77cb0f41-e222-4d36-85b0-0bbf7d6696fd",
              __typename: "Role"
            }
          ],
          node: {
            id: "f003d376-e185-4feb-a3c4-1576e3332620",
            title: "Networking – Friend or Foe?",
            order: 150,
            content: {
              description: {
                description: "\u003cp\u003eThe aim of this course is to provide the learner with the concept of networking and how it can benefit business, from increasing awareness to helping to reach goals and even securing new clients.\u003c/p\u003e"
              }
            },
            contentType: null,
            itemType: "course",
            createdAt: "2022-09-28T14:19:16Z",
            settings: {
              isScored: true,
              frontPage: {
                overlayColor: "rgba(0,0,0,0.5)"
              },
              certificate: {
                enabled: true
              },
              scoreFromModuleIds: [
                "e8b5bd42-bc94-49f8-a5e6-310632a76c72"
              ]
            },
            _deleted: false,
            _isOptimistic: false,
            shared: false,
            image: {
              location: "https://elearningplus.smartlms.co.uk/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaEpJaWxtWXpGaFpqRmpNQzFqTldKa0xUUmlaV0V0T0dVMk15MDJObVE0TUdVMU5EZzJNakFHT2daRlZBPT0iLCJleHAiOm51bGwsInB1ciI6ImJsb2JfaWQifX0=--26eaa7b7c495ae0a1a2e8ee354b9ec0d7dcc49b1/Network-friend.jpg",
              id: "4719ff0a-467d-42cd-a903-8f4d4b8eef40",
              altText: "Test alt text",
              properties: null,
              title: null,
              fileName: "Network-friend.jpg",
              __typename: "MediaItem"
            },
            icon: null,
            prerequisites: {},
            updatedAt: "2025-01-17T15:15:28Z",
            __typename: "ContentItem",
            tags: {
              edges: [
                {
                  order: 9,
                  contentItemId: "f003d376-e185-4feb-a3c4-1576e3332620",
                  __typename: "ContentItemTagEdge",
                  node: {
                    id: "ffd45d0d-23f4-4cc4-b0bd-ec6bd4281908",
                    label: "Marketing",
                    tagType: "category",
                    __typename: "Tag"
                  }
                }
              ],
              __typename: "ContentItemTagConnection"
            },
            users: {
              totalCount: 0,
              __typename: "ContentUserConnection"
            }
          }
        }
      ],
      __typename: "UserContentConnection",
      pageInfo: {
        endCursor: "Nw",
        hasNextPage: false,
        hasPreviousPage: false,
        startCursor: "MQ",
        __typename: "PageInfo"
      }
    },
    resources: {
      totalCount: 1,
      notStartedCount: 1,
      inProgressCount: 0,
      completedCount: 0,
      edges: [
        {
          userId: "8385e59b-e026-4227-8050-a88c9f232384",
          status: null,
          lastVisited: null,
          firstVisited: null,
          createdAt: null,
          updatedAt: null,
          completedAt: null,
          passedAt: null,
          score: null,
          progress: null,
          visits: null,
          properties: {},
          __typename: "UserContentEdge",
          roles: [
            {
              id: "77cb0f41-e222-4d36-85b0-0bbf7d6696fd",
              __typename: "Role"
            }
          ],
          node: {
            id: "e00d597b-d770-4a06-9197-abec6518eb08",
            title: "Zanda360 Platform Guide For Learner Users 240225",
            order: 888,
            _deleted: false,
            _isOptimistic: false,
            content: {
              description: {
                type: "doc",
                content: [
                  {
                    type: "paragraph",
                    attrs: {
                      textAlign: "left",
                      lineHeight: 1.4
                    },
                    content: [
                      {
                        text: "This is the learner Guide",
                        type: "text"
                      }
                    ]
                  }
                ]
              }
            },
            contentType: "document",
            itemType: "resource",
            createdAt: "2025-04-01T14:02:40Z",
            settings: {},
            shared: false,
            image: null,
            icon: null,
            prerequisites: {},
            updatedAt: "2025-04-01T14:02:41Z",
            __typename: "ContentItem",
            document: {
              id: "b8831468-4311-4e73-ae0b-89e87c037e42",
              mediaType: "document",
              location: "https://elearningplus.staging.zanda360.com/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaEpJaWt4TkdWaU16UTJZUzFpTVRSakxUUTJNMll0WWpWaE9DMDNNR1JtWmpKaU9URXhOVGNHT2daRlZBPT0iLCJleHAiOm51bGwsInB1ciI6ImJsb2JfaWQifX0=--7c7feec8ba6ebbef4994cade7dee69807594e738/Zanda360%20Platform%20Guide%20For%20Learner%20Users%20240225.pdf",
              fileName: "Zanda360 Platform Guide For Learner Users 240225.pdf",
              __typename: "MediaItem"
            },
            audio: null,
            tags: {
              edges: [
                {
                  order: 11,
                  contentItemId: "e00d597b-d770-4a06-9197-abec6518eb08",
                  __typename: "ContentItemTagEdge",
                  node: {
                    id: "05fc4d64-5efe-498a-961b-ca933c59d805",
                    label: "Health \u0026 Wellbeing",
                    tagType: "category",
                    __typename: "Tag"
                  }
                }
              ],
              __typename: "ContentItemTagConnection"
            },
            users: {
              totalCount: 0,
              __typename: "ContentUserConnection"
            }
          }
        }
      ],
      __typename: "UserContentConnection"
    }
  }
};
