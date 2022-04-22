import { gql } from "@apollo/client"
import { UserFragment } from "../users"

export const ContentUserEdgeFragment = gql`
  fragment ContentUserEdgeFragment on ContentUserConnection {
    edges {
      node {
        id
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

export const GET_COURSE_USERS = gql`
  query GetCourseUsers($id: ID!) {
    course(id: $id) {
      ...CourseFragment
      users {
        ...ContentUserEdgeFragment
      }
      sections {
        ...SectionFragment
        users {
          ...ContentUserEdgeFragment
        }
        lessons {
          ...LessonFragment
          users {
            ...ContentUserEdgeFragment
          }
        }
      }
    }
  }
  ${UserFragment}
  ${ContentUserEdgeFragment}
`