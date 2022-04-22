import { gql } from '@apollo/client';
import { UserFragment } from './users';

export const ContentFragment = gql`
  fragment ContentFragment on ContentItem {
    content
    contentType
    createdAt
    settings
    image {
      location
      id
      altText
      properties
      title
    }
    id
    icon {
      provider
      properties
      id
    }
    itemType
    prerequisites
    settings
    title
    updatedAt
    _deleted @client
  }
`
export const LibraryItemFragment = gql`
  fragment LibraryItemFragment on ContentItem {
    ...ContentFragment
  }
  ${ContentFragment}
`
export const LessonFragment = gql`
fragment LessonFragment on ContentItem {
  ...ContentFragment
}
${ContentFragment}
`
export const SectionFragment = gql`
  fragment SectionFragment on ContentItem {
    ...ContentFragment
    # parents {
    #   id
    # }
    children {
      ...ContentFragment
    }
  }
  ${ContentFragment}
`
export const CourseFragment = gql`
  fragment CourseFragment on ContentItem {
    ...ContentFragment
    sections {
      ...SectionFragment
    }
    tags {
      id
      label
      tagType
    }
  }
  ${ContentFragment}
  ${SectionFragment}
`
export const PathwayFragment = gql`
  fragment PathwayFragment on ContentItem {
    ...ContentFragment
    courses {
      ...CourseFragment
    }
    tags {
      id
      label
      tagType
    }
  }
  ${ContentFragment}
  ${SectionFragment}
`

export const GET_COURSE = gql`
  query GetCourse($id: ID!) {
    course(id: $id) {
      ...CourseFragment
      sections {
        ...SectionFragment
        children {
          ...ContentFragment
        }
      }
    }
  }
  ${CourseFragment}
  ${SectionFragment}
  ${ContentFragment}
`
export const GET_COURSES = gql`
  query GetCourses {
    courses {
      ...CourseFragment
    }
  }
  ${CourseFragment}
`

export const GET_SECTION = gql`
  query GetSection($id: ID!) {
    section(id: $id) {
      ...SectionFragment
    }
  }
  ${SectionFragment}
`
export const GET_SECTIONS = gql`
  query GetSections {
    sections {
      ...SectionFragment
    }
  }
  ${SectionFragment}
`



export const GET_LESSON = gql`
  query GetLesson($id: ID!) {
    lesson(id: $id) {
      ...LessonFragment
    }
  }
  ${LessonFragment}
  
`

export const GET_LIBRARY_ITEM = gql`
  query GetLibraryItem($id: ID!) {
    libraryItem(id: $id) {
      ...LibraryItemFragment
    }
  }
  ${LibraryItemFragment}
`

export const GET_LIBRARY_ITEMS = gql`
  query GetLibraryItems {
    libraryItems {
      ...LibraryItemFragment
    }
  }
  ${LibraryItemFragment}
`

export const GET_PATHWAY = gql`
  query GetPathway($id: ID!) {
    pathway(id: $id) {
      ...PathwayFragment
    }
  }
  ${PathwayFragment}
  
`

export const GET_PATHWAYS = gql`
  query GetPathways {
    pathways {
      ...PathwayFragment
    }
  }
  ${PathwayFragment}
`

export const GET_QUIZ = gql`
  query GetQuiz($id: ID!) {
    quiz(id: $id) {
      title
      updatedAt
      prerequisites
      id
      itemType
      content
      createdAt
      questions {
        answers
        content
        createdAt
        id
        questionType
      }
    }
  }
`

export const GET_QUIZZES = gql`
  query GetQuizzes {
    quizzes {
      title
      updatedAt
      prerequisites
      id
      itemType
      content
      createdAt
      questions {
        answers
        content
        createdAt
        id
        questionType
      }
    }
  }
`

export const GET_MEDIA_ITEMS = gql`
  query GetMediaItems(
    $where: JSON,
  ) {  
    mediaItems(where: $where) {
      altText
      createdAt
      deletedAt
      fileName
      mediaType
      location
      properties
      id
    }
  }
` 

export const GET_SCORM_MODULES = gql`
  query GetScormModules(
    $where: JSON,
  ) { 
    scormModules(where: $where) {
      id
      createdAt
      launchUrl
      manifestData
      title
      updatedAt
      deletedAt
      contentType
    }
  }
` 