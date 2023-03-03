import { gql } from '@apollo/client';
import { CourseFragment } from '../../queries/allQueries';

export const CREATE_COURSE = gql`
  mutation CreateCourse(
    $title: String!,
    $content: JSON,
    $certificateProperties: JSON,
    $certificateTemplateId: ID,
    $sections: JSON,
    $settings: JSON,
    $tags: [TagInput!],
    $imageId: ID,
    $imageUrl: String,
    $prerequisites: JSON
  ) {
    createCourse(
      input: {
        title: $title,
        content: $content,
        certificateProperties: $certificateProperties,
        certificateTemplateId: $certificateTemplateId,
        sections: $sections,
        settings: $settings,
        tags: $tags,
        imageId: $imageId,
        imageUrl: $imageUrl,
        prerequisites: $prerequisites
      }
    ) {
      course {
        ...CourseFragment
        groupsEnrolled {
          edges {
            node {
              id
            }
          }
        }
      }
      message
    }
  }
  ${CourseFragment}
`;
