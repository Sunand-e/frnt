import { GetRolesQuery } from "../../graphql/generated";

export const rolesResponse: GetRolesQuery = {
  roles: [
    {
      id: "7f84184e-ec0f-40d4-8b72-4239ac2e329b",
      name: "Group Leader",
      roleType: "group_role",
      __typename: "Role",
      _deleted: false
    },
    {
      id: "4ec7cec7-b0bf-4495-9612-af8ad4970289",
      name: "Member",
      roleType: "group_role",
      __typename: "Role",
      _deleted: false
    },
    {
      id: "9911691a-420b-4367-8bf5-d0b5d6615d27",
      name: "Instructor",
      roleType: "tenant_role",
      __typename: "Role",
      _deleted: false
    },
    {
      id: "153faecf-54d3-4e50-9c9c-fc22ee6f2550",
      name: "Supervisor",
      roleType: "tenant_role",
      __typename: "Role",
      _deleted: false
    },
    {
      id: "64e949b0-8b37-4884-883a-3920ca1858db",
      name: "Resource Creator",
      roleType: "tenant_role",
      __typename: "Role",
      _deleted: false
    },
    {
      id: "77cb0f41-e222-4d36-85b0-0bbf7d6696fd",
      name: "Learner",
      roleType: "tenant_role",
      __typename: "Role",
      _deleted: false
    },
    {
      id: "b70681d9-e122-448e-8e4d-55ecbd42de7f",
      name: "User",
      roleType: "tenant_role",
      __typename: "Role",
      _deleted: false
    },
    {
      id: "4d46eb1c-9e52-4d9b-a489-07b89933be3d",
      name: "Tenant Admin",
      roleType: "tenant_role",
      __typename: "Role",
      _deleted: false
    }
  ]
}