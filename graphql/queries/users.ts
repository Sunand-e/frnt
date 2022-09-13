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
    profileImageUrl
    roles {
      id
      name
      roleType
    }

  }
`

export const UserCoursesFragment = gql`
  fragment UserCoursesFragment on User {
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
        groups {
          edges {
            node {
              id
              name
            }
          }
        }
        lastVisited
        completed
        score
        status
        visits
      }
    }
  }
  ${ContentFragment}
`

export const UserGroupsFragment = gql`
  fragment UserGroupsFragment on User {
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
`

export const GET_USER = gql`
  query GetUser($id: ID) {
    user(id: $id) {
      ...UserFragment
      ...UserCoursesFragment
      ...UserGroupsFragment
    }
  }
  ${UserFragment}
  ${UserCoursesFragment}
  ${UserGroupsFragment}
`

export const GET_USERS = gql`
  query GetUsers {
    users(where: { status: "active" }) {
      edges {
        node {
          ...UserFragment
        }
      }
    }
  }
  ${UserFragment}
`

export const UserContentEdgeFragment = gql`
  fragment UserContentEdgeFragment on UserContentConnection {
    edges {
      node {
        id
        title
        tags {
          id
          label
          tagType
        }
      }
      id
      status
      lastVisited
      firstVisited
      createdAt
      updatedAt
      score
      visits
      completed
    }
    totalCount
  }
`

export const GET_USER_COURSES = gql`
  query GetUserCourses($id: ID) {
    user(id: $id) {
      courses {
        ...UserContentEdgeFragment
      }
    }
  }
  ${UserContentEdgeFragment}
`

export const GET_USERS_COURSES = gql`
  query GetUsersCourses {
    users {
      edges {
        node {
          ...UserFragment
          courses {
            ...UserContentEdgeFragment
          }
        }
      }
    }
  }
  ${UserFragment}
  ${UserContentEdgeFragment}
`


export const GET_USER_CONTENT = gql`
  query GetUserContent($id: ID) {
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