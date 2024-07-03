import { gql } from '@apollo/client';

export const GroupOverviewFragment = gql`
  fragment GroupOverviewFragment on Group {
    createdAt
    id
    name
    updatedAt
    isOrganisation
    enrolmentLicenseTotal
    enrolments
    users {
      totalCount
    }
    image {
      location
      id
      altText
      properties
      title
    }
    assignedResources {
      totalCount
    }
    assignedCourses {
      totalCount
    }
    assignedPathways {
      totalCount
    }
    assignedContents {
      totalCount
    }
    provisionedContents {
      totalCount
    }
    provisionedCourses {
      totalCount
    }
    _deleted @client
  }
`


export const GroupUsersFragment = gql`
fragment GroupUsersFragment on GroupUserConnection {
  edges {
    userId
    groupId
    node {
      id
      fullName
      email
      profileImageUrl
      _deleted @client
    }
  }
}
`


export const GroupDetailsFragment = gql`
  fragment GroupDetailsFragment on Group {
    ...GroupOverviewFragment
    users {
      ...GroupUsersFragment
      edges {
        userId
        groupId
        roles {
          id
          name
        }
      }
    }
    
    provisionedContents {
      edges {
        createdAt
        groupId
        contentItemId
        node {
          id
          title
          itemType
          tags {
            edges {
              node {
                id
                label
              }
            }
          }
          image {
            id
          }
        }
      }
    }
    assignedContents {
      edges {
        createdAt
        groupId
        contentItemId
        node {
          id
          title
          itemType
          tags {
            edges {
              node {
                id
                label
              }
            }
          }
          image {
            id
          }
        }
      }
    }
    _deleted @client
  }
  ${GroupOverviewFragment}
  ${GroupUsersFragment}
`

export const GET_GROUP = gql`
  query GetGroup($id: ID!) {
    group(id: $id) {
      ...GroupDetailsFragment
    }
  }
  ${GroupDetailsFragment}
`

export const GET_GROUPS = gql`
  query GetGroups {
    groups {
      edges {
        node {
          ...GroupOverviewFragment
        }
      }
    }
  }
  ${GroupOverviewFragment}
`

export const GET_GROUPS_USERS = gql`
  query GetGroupsUsers {
    groups {
      edges {
        node {
          id
          users {
            ...GroupUsersFragment
          }
        }
      }
    }
  }
  ${GroupUsersFragment}
`

export const GET_GROUPS_DETAILED = gql`
  query GetGroupsDetailed {
    groups {
      edges {
        node {
          ...GroupDetailsFragment
        }
      }
    }
  }
  ${GroupDetailsFragment}
`
