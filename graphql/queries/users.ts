import { gql } from '@apollo/client';
import { ContentFragment } from './allQueries';

export const UserFragment = gql`
  fragment UserFragment on User {
    createdAt
    email
    firstName
    fullName
    id
    lastName
    status
    updatedAt
    userType
    roles {
      id
      name
      roleType
    }
    courses {
      edges {
        node {
          ...ContentFragment
        }
        roles {
          id
          name
          roleType
        }
      }
    }
    groups {
      edges {
        node {
          id
          name
        }
        roles {
          id
          name
          roleType
        }
      }
    }
  }
  ${ContentFragment}
`

export const GET_USER = gql`
  query GetUser($id: ID) {
    user(id: $id) {
      ...UserFragment
    }
  }
  ${UserFragment}
`

export const GET_USERS = gql`
  query GetUsers {
    users(where: { status: "active" }) {
      ...UserFragment
    }
  }
  ${UserFragment}
`

export const UserContentEdgeFragment = gql`
  fragment UserContentEdgeFragment on UserContentConnection {
    edges {
      node {
        id
      }
      status
      lastVisited
      firstVisited
      createdAt
      updatedAt
      score
      visits
      completed
    }
  }
`

export const GET_USER_CONTENT = gql`
  query GetUserContent($id: ID!) {
    user(id: $id) {
      ...UserFragment
      courses {
        ...UserContentEdgeFragment
      }
      sections {
        ...UserContentEdgeFragment
      }
      lessons {
        ...UserContentEdgeFragment
      }
    }
  }
  ${UserFragment}
  ${UserContentEdgeFragment}
`