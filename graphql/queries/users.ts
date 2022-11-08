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

export const UserContentConnectionFragment = gql`
  fragment UserContentConnectionFragment on UserContentConnection {
    totalCount
    edges {
      userId
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
        capabilities {
          id
          name
        }
      }
      groups {
        edges {
          node {
            id
            name      
          }
        }
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

export const UserCoursesFragment = gql`
  fragment UserCoursesFragment on User {
    courses {
      ...UserContentConnectionFragment
    }
  }
  ${UserContentConnectionFragment}
`

export const CurrentUserCoursesFragment = gql`
  fragment CurrentUserCoursesFragment on Query {
    courses {
      ...UserContentConnectionFragment
    }
  }
  ${UserContentConnectionFragment}
`

export const CurrentUserPathwaysFragment = gql`
  fragment CurrentUserPathwaysFragment on Query {
    pathways {
      ...UserContentConnectionFragment
      edges {
        node {
          children {
            __typename
            id
            title
          }
        }
      }
    }
  }
  ${ContentFragment}
  ${UserContentConnectionFragment}
`

export const CurrentUserResourcesFragment = gql`
  fragment CurrentUserResourcesFragment on Query {
    resources {
      ...UserContentConnectionFragment
      edges {
        node {
          ...ContentFragment
        }
      }
    }
  }
  ${ContentFragment}
  ${UserContentConnectionFragment}
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
        userId
        node {
          id
        }
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
          capabilities {
            id
            name
          }      
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
    ...CurrentUserPathwaysFragment
    ...CurrentUserResourcesFragment
    ...CurrentUserCoursesFragment
  }
  ${CurrentUserFragment}
  ${CurrentUserResourcesFragment}
  ${CurrentUserPathwaysFragment}
  ${CurrentUserCoursesFragment}
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

export const GET_USER_COURSES = gql`
  query GetUserCourses($id: ID) {
    user(id: $id) {
      courses {
        ...UserContentConnectionFragment
      }
    }
  }
  ${UserContentConnectionFragment}
`

export const GET_USERS_COURSES = gql`
  query GetUsersCourses {
    users {
      edges {
        node {
          ...UserFragment
          courses {
            ...UserContentConnectionFragment
          }
        }
      }
    }
  }
  ${UserFragment}
  ${UserContentConnectionFragment}
`


export const GET_USER_COURSE = gql`
  query GetUserCourse($courseFilter: JSON, $lessonSectionFilter: JSON) {
    user {
      id
    }
    courses(where: $courseFilter) {
        ...UserContentConnectionFragment
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
        ...UserContentConnectionFragment
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
        ...UserContentConnectionFragment
      }
      lessons(where: $lessonSectionFilter) {
        ...UserContentConnectionFragment
      }
  }
  ${UserContentConnectionFragment}
`

export const GET_USER_PATHWAY = gql`
  query GetUserPathway($courseResourceFilter: JSON, $pathwayFilter: JSON) {
    user {
      id
      pathways(where: $pathwayFilter) {
        ...UserContentConnectionFragment
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
        ...UserContentConnectionFragment
      }
      resources(where: $courseResourceFilter) {
        ...UserContentConnectionFragment
      }
    }
  }
  ${UserContentConnectionFragment}
`