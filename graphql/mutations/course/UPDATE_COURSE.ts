import { gql } from '@apollo/client';
import { CourseFragment } from '../../queries/allQueries';


export const UPDATE_COURSE = gql`
  mutation UpdateCourse(
    $id: ID!
    $title: String,
    $content: JSON,
    $certificateProperties: JSON,
    # $certificateTemplateId: ID,
    $childrenIds: JSON,
    $prerequisites: JSON,
    $imageId: ID,

  ) {
    updateCourse(
      input: {
        id: $id,
        title: $title,
        content: $content,
        imageId: $imageId,
        certificateProperties: $certificateProperties,
        # certificateTemplateId: $certificateTemplateId,
        childrenIds: $childrenIds,
        prerequisites: $prerequisites
      }
    ) {
      course {
      ...CourseFragment
      }
    }
  }
  ${CourseFragment}
`;
