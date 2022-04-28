import { gql } from '@apollo/client';
import { CourseFragment } from '../../queries/allQueries';


export const UPDATE_COURSE = gql`
  mutation UpdateCourse(
    $id: ID!
    $title: String,
    $content: JSON,
    $certificateProperties: JSON,
    $settings: JSON,
    $tags: [TagInput!],
    $imageId: ID,
    $imageUrl: String,
    $childrenIds: JSON,
    $prerequisites: JSON
  ) {
    updateCourse(
      input: {
        id: $id,
        title: $title,
        content: $content,
        certificateProperties: $certificateProperties,
        settings: $settings,
        tags: $tags,
        imageId: $imageId,
        imageUrl: $imageUrl,
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
