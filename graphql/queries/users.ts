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
  fragment UserCoursesFragment on Query {
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

export const UserPathwaysFragment = gql`
  fragment UserPathwaysFragment on Query {
    pathways {
      edges {
        node {
          ...ContentFragment
          children {
            __typename
            id
            title
          }
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
        firstVisited
        createdAt
        updatedAt
        completed
        score
        status
        visits
      }
    }
  }
  ${ContentFragment}
`

export const UserResourcesFragment = gql`
  fragment UserResourcesFragment on Query {
    resources {
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
        firstVisited
        createdAt
        updatedAt
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
      ...UserGroupsFragment
      ...UserCapabilitiesFragment
    }
    ...UserPathwaysFragment
    ...UserResourcesFragment
    ...UserCoursesFragment
  }
  ${CurrentUserFragment}
  ${UserResourcesFragment}
  ${UserPathwaysFragment}
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
          id
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
          groups {
            totalCount
            edges {
              node {
                id
                name
              }
              roles {
                id
                name
              }
            }
          }
        }
      }
    }
  }
  ${UserFragment}
`

export const UserContentEdgeFragment = gql`
  fragment UserContentEdgeFragment on UserContentConnection {
    totalCount
    edges {
      node {
        id
        title
        content
        contentType
        itemType
        mediaItem {
          id
          location
        }
      }
      roles {
        id
        name
        roleType
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
    }
    courses(where: $courseFilter) {
        ...UserContentEdgeFragment
        edges {
          node {
            id
            sections {
              id
              lessons {
                id
              }
            }
          }
        }
      }
      pathways {
        ...UserContentEdgeFragment
        edges {
          node {
            id
            children {
              id
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
  ${UserContentEdgeFragment}
`

export const GET_USER_PATHWAY = gql`
  query GetUserPathway($courseResourceFilter: JSON, $pathwayFilter: JSON) {
    user {
      id
      pathways(where: $pathwayFilter) {
        ...UserContentEdgeFragment
        edges {
          node {
            id
            children {
              id
            }
          }
        }
      }
      courses(where: $courseResourceFilter) {
        ...UserContentEdgeFragment
      }
      resources(where: $courseResourceFilter) {
        ...UserContentEdgeFragment
      }
    }
  }
  ${UserContentEdgeFragment}
`