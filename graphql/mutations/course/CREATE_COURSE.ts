import { gql } from '@apollo/client';
import { CourseFragment } from '../../queries/allQueries';


export const CREATE_COURSE = gql`
  mutation CreateCourse(
    $title: String!,
    $content: JSON,
    $certificateProperties: JSON,
    $certificateTemplateId: ID,
    $sections: JSON,
    $imageId: ID,
    # $childrenIds: JSON, 
    $prerequisites: JSON
  ) {
    createCourse(
      input: {
        title: $title,
        content: $content,
        certificateProperties: $certificateProperties,
        certificateTemplateId: $certificateTemplateId,
        imageId: $imageId,
        sections: $sections,
        # childrenIds: $childrenIds,
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
