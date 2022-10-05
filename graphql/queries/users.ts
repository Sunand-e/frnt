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

export const CurrentUserFragment = gql`
  fragment CurrentUserFragment on User {
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

export const UserCapabilitiesFragment = gql`
  fragment UserCapabilitiesFragment on User {
    roles {
      id
      name
      roleType
      capabilities {
        id
        name
      }
    }
    courses {
      edges {
        roles {
          id
          capabilities {
            id
            name
          }
        }
      }
    }
    groups {
      edges {
        roles {
          id
          capabilities {
            id
            name
          }
        }
      }
    }
  }
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

export const GET_CURRENT_USER = gql`
  query GetCurrentUser($id: ID) {
    user(id: $id) {
      ...CurrentUserFragment
      ...UserCoursesFragment
      ...UserGroupsFragment
      ...UserCapabilitiesFragment
    }
  }
  ${CurrentUserFragment}
  ${UserCoursesFragment}
  ${UserGroupsFragment}
  ${UserCapabilitiesFragment}
`


export const GET_USER_CAPABILITIES = gql`
  query GetUserCapabilities {
    user {
      id
      userType
      roles {
        id
        name
        roleType
        capabilities {
          id
          name
        }
      }
      courses {
        edges {
          roles {
            id
            capabilities {
              id
              name
            }
          }
        }
      }
      groups {
        edges {
          roles {
            id
            capabilities {
              id
              name
            }
          }
        }
      }
    }
  }
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
        content
        contentType
        itemType
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
  query GetUserContent($courseFilter: JSON, $lessonSectionFilter: JSON) {
    user {
      id
      courses(where: $courseFilter) {
        ...UserContentEdgeFragment
        edges {
          node {
            sections {
              id
              lessons {
                id
              }
            }
          }
        }
      }
      sections(where: $lessonSectionFilter) {
        ...UserContentEdgeFragment
      }
      lessons(where: $lessonSectionFilter) {
        ...UserContentEdgeFragment
      }
    }
  }
  ${UserContentEdgeFragment}
`
