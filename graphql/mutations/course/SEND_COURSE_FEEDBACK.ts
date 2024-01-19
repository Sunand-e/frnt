import { gql } from '@apollo/client';

export const SEND_COURSE_FEEDBACK = gql`
  mutation SendCourseFeedback(
    $message: String!,
    $courseId: ID!
  ) {
    sendCourseFeedback(
      message: $message,
      courseId: $courseId
    ) {
      status
    }
  }
`;
