import { gql } from "@apollo/client"
import { CourseFragment } from "../allQueries"
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
      ...CourseFragment
      users(first: $first, after: $after) {
        ...ContentUserEdgeFragment
      }
    }
  }
  ${CourseFragment}
  ${UserFragment}
  ${ContentUserEdgeFragment}
`


// // INCOMPLETE...
// export const GET_USER_COURSE_LESSONS = gql`
//   query GetUserCourseLessons($userId: ID!, $courseId: ID!) {
//     course(id: $userId) {
//       ...CourseFragment
//       users {
//         ...ContentUserEdgeFragment
//       }
//     }
//   }
//   ${CourseFragment}
//   ${UserFragment}
//   ${ContentUserEdgeFragment}
// `