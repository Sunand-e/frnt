import { gql } from '@apollo/client';
import { ContentFragment, CourseFragment, QuizFragment, ResourceFragment } from './allQueries';
import { TagFragment } from './tags';
import { UserContentEdgeFragment, UserFragment } from './users';

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
    courses(first: $first, after: $after, where: $where) {
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
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
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

export const UserGroupsFragment = gql`
  fragment UserGroupsFragment on User {
    groups {
      totalCount
      edges {
        groupId
        userId
        node {
          id
          name
          isOrganisation
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
  query GetUser($id: ID, $first: Int, $after: String, $where: JSON) {
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

export const GET_USER_WITH_COURSES = gql`
  query GetUser($id: ID, $first: Int, $after: String, $where: JSON) {
    user(id: $id) {
      ...UserFragment
      ...UserCoursesGroupsFragment
    }
  }
  ${UserFragment}
  ${UserCoursesGroupsFragment}
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
              groupId
              userId
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
export const GET_USER_CONTENT = gql`
  query GetUserContent($id: ID) {
    user(id: $id) {
      id
      contentItems {
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
              groupId
              userId
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
        groupId
        userId
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