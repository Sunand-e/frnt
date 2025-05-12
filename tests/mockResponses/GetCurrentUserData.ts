import { GetCurrentUserQuery } from "../../graphql/generated";

export const currentUserResponse: GetCurrentUserQuery = {
  user: {
    createdAt: "2025-02-06T05:36:19Z",
    email: "admin@example.com",
    firstName: "Super",
    fullName: "Super Admin",
    id: "08b47ece-f950-475d-86dc-a436350bd74e",
    lastName: "Admin",
    status: "active",
    updatedAt: "2025-04-22T12:08:08Z",
    userType: "SuperAdmin",
    profileImageUrl: "/images/pic-photo.avif",
    invitationSentAt: "2025-02-13T10:59:16Z",
    invitationAcceptedAt: "2025-02-13T11:49:11Z",
    currentSignInAt: "2025-04-22T12:08:08Z",
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
        __typename: "Role",
        capabilities: [
          {
            id: "b43c2a8b-30d3-4163-9953-3ed947c3284d",
            name: "GetSelf",
            __typename: "Capability"
          }
        ]
      }
    ],
  }
};