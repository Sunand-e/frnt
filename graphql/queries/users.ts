import { gql } from '@apollo/client';
import { ContentFragment, CourseFragment, QuizFragment, ResourceFragment } from './allQueries';
import { TagFragment } from './tags';

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
    invitationSentAt
    invitationAcceptedAt
    currentSignInAt
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
  ${TagFragment}
`

export const UserContentEdgeFragment = gql`
  fragment UserContentEdgeFragment on UserContentEdge {
    userId
    node {
      ...ContentFragment
      id
      title
      order
      content
      contentType
      itemType
      order
      tags {
        edges {
          id
          order
          node {
            id
            label
            tagType
          }
        }
      }
      groupsEnrolled {
        edges {
          node {
            id
          }
        }
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
        roles {
          id
        }
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
    completedAt
    passedAt
    score
    progress
    visits
  }
  ${ContentFragment}
`
export const UserContentConnectionFragment = gql`
  fragment UserContentConnectionFragment on UserContentConnection {
    totalCount
    edges {
      ...UserContentEdgeFragment
    }
  }
  ${UserContentEdgeFragment}
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

export const UserPathwaysFragment = gql`
  fragment UserPathwaysFragment on User {
    pathways {
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

export const UserResourcesFragment = gql`
  fragment UserResourcesFragment on User {
    resources {
      ...UserContentConnectionFragment
      edges {
        node {
          ...ResourceFragment
        }
      }
    }
  }
  ${ResourceFragment}
  ${UserContentConnectionFragment}
`

export const CurrentUserResourcesFragment = gql`
  fragment CurrentUserResourcesFragment on Query {
    resources {
      ...UserContentConnectionFragment
      edges {
        node {
          ...ResourceFragment
        }
      }
    }
  }
  ${ResourceFragment}
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
      ...UserPathwaysFragment
      ...UserCoursesFragment
      ...UserResourcesFragment
      ...UserGroupsFragment
    }
  }
  ${UserFragment}
  ${UserPathwaysFragment}
  ${UserCoursesFragment}
  ${UserResourcesFragment}
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
    tags {
      ...TagFragment
    }
  }
  ${CurrentUserFragment}
  ${CurrentUserResourcesFragment}
  ${CurrentUserPathwaysFragment}
  ${CurrentUserCoursesFragment}
  ${UserGroupsFragment}
  ${UserCapabilitiesFragment}
  ${TagFragment}
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

export const GET_USER_PATHWAYS = gql`
  query GetUserPathways($id: ID) {
    user(id: $id) {
      pathways {
        ...UserContentConnectionFragment
      }
    }
  }
  ${UserContentConnectionFragment}
`

export const GET_USER_RESOURCES = gql`
  query GetUserResources($id: ID) {
    user(id: $id) {
      resources {
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
          groups {
            edges {
              node {
                id
              }
            }
          }
        }
      }
    }
    groups {
      edges {
        node {
          id
          assignedCourses {
            edges {
              node {
                id
              }
            }
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
          ...CourseFragment
          sections {
            id
            title
            _deleted @client
            children {
              title
              contentType
              itemType
              __typename
              _deleted @client
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
    quizzes(where: $lessonSectionFilter) {
      ...UserContentConnectionFragment
      edges {
        node {
          ...QuizFragment
        }
      }
    }
  }
  ${UserContentConnectionFragment}
  ${CourseFragment}
  ${QuizFragment}
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