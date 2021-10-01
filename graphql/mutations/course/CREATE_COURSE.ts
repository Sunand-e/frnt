import { gql } from '@apollo/client';
import { CourseFragment } from '../../queries/allQueries';


export const CREATE_COURSE = gql`
  mutation CreateCourse(
    $title: String!,
    $content: JSON,
    $certificateProperties: JSON,
    $certificateTemplateId: ID,
    $childrenIds: JSON, 
    $prerequisites: JSON
  ) {
    createCourse(
      input: {
        title: $title,
        content: $content,
        certificateProperties: $certificateProperties,
        certificateTemplateId: $certificateTemplateId,
        childrenIds: $childrenIds,
        prerequisites: $prerequisites
      }
    ) {
      course {
        ...CourseFragment
      }
      message
    }
  }
  ${CourseFragment}
`;
