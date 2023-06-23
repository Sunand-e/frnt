import { gql } from "@apollo/client"
import { CourseFragment } from "../allQueries"
import { UserFragment } from "../users"

export const ContentUserEdgeFragment = gql`
  fragment ContentUserEdgeFragment on ContentUserConnection {
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
  }
`

export const GET_COURSE_USERS = gql`
  query GetCourseUsers($id: ID!) {
    course(id: $id) {
      ...CourseFragment
      users {
        ...ContentUserEdgeFragment
      }
      # sections {
      #   ...SectionFragment
      #   users {
      #     ...ContentUserEdgeFragment
      #   }
      #   lessons {
      #     ...LessonFragment
      #     users {
      #       ...ContentUserEdgeFragment
      #     }
      #   }
      # }
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