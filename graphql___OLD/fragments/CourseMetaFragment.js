import { gql } from '@apollo/client';

export const CourseMetaFragment = gql`
fragment CourseMeta on Course {
  uri
}
`