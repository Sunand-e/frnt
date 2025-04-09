import { gql } from "@apollo/client"
import { ContentFragmentWithoutUsers } from "../allQueries"
import { UserFragment } from "../users"

export const ContentUserEdgeFragment = gql`
  fragment ContentUserEdgeFragment on ContentUserConnection {
    totalCount
    edges {
      node {
        ...UserFragment
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
    pageInfo{
      endCursor
      hasNextPage
      hasPreviousPage
      startCursor
    }
  }
`

export const GET_COURSE_USERS = gql`
  query GetCourseUsers($id: ID!, $first: Int, $after: String) {
    course(id: $id) {
      ...ContentFragmentWithoutUsers
      users(first: $first, after: $after) {
        ...ContentUserEdgeFragment
      }
    }
  }
  ${ContentFragmentWithoutUsers}
  ${UserFragment}
  ${ContentUserEdgeFragment}
`
