import { gql } from '@apollo/client';
import { ContentFragment, CourseFragment, QuizFragment, ResourceFragment } from './allQueries';
import { UserQuizAttemptsFragment } from './quizzes';
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

export const UserContentFragment = gql`
  fragment UserContentFragment on UserContent {
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
    properties
  }
`
export const UserContentEdgeFragment = gql`
  fragment UserContentEdgeFragment on UserContentEdge {
    userId
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
    properties

    node {
      id
      title
      order
      content
      contentType
      itemType
      ...ContentFragment
    }
  }
  ${ContentFragment}
`

export const UserContentConnectionFragment = gql`
  fragment UserContentConnectionFragment on UserContentConnection {
    totalCount
    notStartedCount
    inProgressCount
    completedCount
    edges {
      ...UserContentEdgeFragment
    }
  }
  ${UserContentEdgeFragment}
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
  }
`

export const GET_CURRENT_USER = gql`
  query GetCurrentUser($id: ID) {
    user(id: $id) {
      ...UserFragment
      ...UserCapabilitiesFragment
    }
  }
  ${UserFragment}
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
            parents {
              id
            }
            _deleted @client
            children {
              parents {
                id
              }
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
        ...UserQuizAttemptsFragment
        node {
          ...QuizFragment
        }
      }
    }
  }
  ${UserContentConnectionFragment}
  ${UserQuizAttemptsFragment}
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