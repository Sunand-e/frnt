import { gql } from '@apollo/client';
import { ContentFragment, CourseFragment, QuizFragment, ResourceFragment } from './allQueries';
import { TagFragment } from './tags';
import { UserContentEdgeFragment, UserFragment, UserGroupsFragment } from './users';

export const UserContentGroupsConnectionFragment = gql`
  fragment UserContentGroupsConnectionFragment on UserContentConnection {
    totalCount
    notStartedCount
    inProgressCount
    completedCount
    edges {
      ...UserContentEdgeFragment
      node {
        tags {
          edges {
            node {
              id
            }
          }
        }
      }
      roles {
        id
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
    }
  }
  ${UserContentEdgeFragment}
`

export const UserCoursesGroupsFragment = gql`
  fragment UserCoursesGroupsFragment on User {
    courses {
      ...UserContentGroupsConnectionFragment
      edges {
      ...UserContentEdgeFragment
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
      }
    }
  }
  ${UserContentGroupsConnectionFragment}
  ${UserContentEdgeFragment}
`


export const UserPathwaysGroupsFragment = gql`
  fragment UserPathwaysGroupsFragment on User {
    pathways {
      ...UserContentGroupsConnectionFragment
    }
  }
  ${UserContentGroupsConnectionFragment}
`

export const UserResourcesGroupsFragment = gql`
  fragment UserResourcesGroupsFragment on User {
    resources {
      ...UserContentGroupsConnectionFragment
      edges {
        node {
          ...ResourceFragment
        }
      }
    }
  }
  ${ResourceFragment}
  ${UserContentGroupsConnectionFragment}
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

export const GET_USER = gql`
  query GetUser($id: ID) {
    user(id: $id) {
      ...UserFragment
      ...UserPathwaysGroupsFragment
      ...UserCoursesGroupsFragment
      ...UserResourcesGroupsFragment
      ...UserGroupsFragment
    }
  }
  ${UserFragment}
  ${UserPathwaysGroupsFragment}
  ${UserCoursesGroupsFragment}
  ${UserResourcesGroupsFragment}
  ${UserGroupsFragment}
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
      id
      courses {
        ...UserContentGroupsConnectionFragment
      }
    }
  }
  ${UserContentGroupsConnectionFragment}
`

export const GET_USER_PATHWAYS = gql`
  query GetUserPathways($id: ID) {
    user(id: $id) {
      id
      pathways {
        ...UserContentGroupsConnectionFragment
      }
    }
  }
  ${UserContentGroupsConnectionFragment}
`

export const GET_USER_RESOURCES = gql`
  query GetUserResources($id: ID) {
    user(id: $id) {
      id
      resources {
        ...UserContentGroupsConnectionFragment
      }
    }
  }
  ${UserContentGroupsConnectionFragment}
`

export const GET_USERS_COURSES_GROUPS = gql`
  query GetUsersCoursesGroups {
    users {
      edges {
        node {
          ...UserFragment
          courses {
            ...UserContentGroupsConnectionFragment
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
  ${UserContentGroupsConnectionFragment}
`


export const GET_USER_COURSE = gql`
  query GetUserCourse($courseFilter: JSON, $lessonSectionFilter: JSON) {
    user {
      id
    }
    courses(where: $courseFilter) {
      ...UserContentGroupsConnectionFragment
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
      ...UserContentGroupsConnectionFragment
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
      ...UserContentGroupsConnectionFragment
    }
    lessons(where: $lessonSectionFilter) {
      ...UserContentGroupsConnectionFragment
    }
    quizzes(where: $lessonSectionFilter) {
      ...UserContentGroupsConnectionFragment
      edges {
        node {
          ...QuizFragment
        }
      }
    }
  }
  ${UserContentGroupsConnectionFragment}
  ${CourseFragment}
  ${QuizFragment}
`

export const GET_USER_PATHWAY = gql`
  query GetUserPathway($courseResourceFilter: JSON, $pathwayFilter: JSON) {
    user {
      id
      pathways(where: $pathwayFilter) {
        ...UserContentGroupsConnectionFragment
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
        ...UserContentGroupsConnectionFragment
      }
      resources(where: $courseResourceFilter) {
        ...UserContentGroupsConnectionFragment
      }
    }
  }
  ${UserContentGroupsConnectionFragment}
`