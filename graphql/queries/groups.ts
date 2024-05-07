import { gql } from '@apollo/client';

export const GroupFragment = gql`
  fragment GroupFragment on Group {
    createdAt
    id
    name
    updatedAt
    isOrganisation
    enrolmentLicenseTotal
    enrolments
    users {
      totalCount
      edges {
        node {
          id
          fullName
          email
          profileImageUrl
        }
        roles {
          id
          name
        }
      }
    }
    image {
      location
      id
      altText
      properties
      title
    }
    enrolledCourses {
      totalCount
      edges {
        node {
          id
        }
      }
    }
    assignedResources {
      totalCount
      edges {
        node {
          id
        }
      }
    }
    assignedCourses {
      totalCount
      edges {
        node {
          id
        }
      }
    }
    assignedPathways {
      totalCount
      edges {
        node {
          id
        }
      }
    }
    provisionedResources {
      totalCount
      edges {
        node {
          id
        }
      }
    }
    provisionedCourses {
      totalCount
      edges {
        node {
          id
          title
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
    provisionedPathways {
      totalCount
      edges {
        node {
          id
        }
      }
    }
    _deleted @client
  }
`
export const GET_GROUP = gql`
  query GetGroup($id: ID!) {
    group(id: $id) {
      ...GroupFragment
    }
  }
  ${GroupFragment}
`

export const GET_GROUPS = gql`
  query GetGroups {
    groups {
      edges {
        node {
          ...GroupFragment
        }
      }
    }
  }
  ${GroupFragment}
`
