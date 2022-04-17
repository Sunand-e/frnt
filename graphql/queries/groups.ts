import { gql } from '@apollo/client';

export const GroupFragment = gql`
  fragment GroupFragment on Group {
    createdAt
    id
    name
    updatedAt
    users {
      totalCount
      edges {
        node {
          id
        }
      }
    }
    enrolledCourses {
      id
    }
    assignedCourses {
      id
    }
    _deleted @client
  }
`
export const GET_GROUP = gql`
  query GetGroup($id: ID!) {
    group(id: $id) {
      ...GroupFragment
    }
  }
  ${GroupFragment}
`

export const GET_GROUPS = gql`
  query GetGroups {
    groups {
      ...GroupFragment
    }
  }
  ${GroupFragment}
`
