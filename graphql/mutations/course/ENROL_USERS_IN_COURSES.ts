import { gql } from '@apollo/client';


export const ENROL_USERS_IN_COURSES = gql`
  mutation EnrolUsersInCourses(
    $userIds: [ID!]!,
    $groupIds: [ID!]!
  ) {
    enrolUsersInCourses(
      userIds: $userIds,
      courseIds: $groupIds
    ) {
      courses {
        id
        title
      }
    }
  }
`;
