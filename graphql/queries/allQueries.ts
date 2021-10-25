import { gql } from '@apollo/client';

export const ContentFragment = gql`
  fragment ContentFragment on ContentItem {
    content
    contentType
    createdAt
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
    title
    updatedAt
    _deleted @client
  }
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


export const GroupFragment = gql`
  fragment GroupFragment on Group {
    createdAt
    id
    name
    updatedAt
    users {
      id
    }
    _deleted @client
  }
`
export const GET_GROUP = gql`
  query GetGroup($id: ID!) {
    group(id: $id) {
      ...GroupFragment
    }
  }
  ${GroupFragment}
`

export const GET_GROUPS = gql`
  query GetGroups {
    groups {
      ...GroupFragment
    }
  }
  ${GroupFragment}
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
      id
    }
  }
`

export const GET_LIBRARY_ITEMS = gql`
  query GetLibraryItems {
    libraryItems {
      content
      contentType
      createdAt
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
      title
      updatedAt
      tags {
        id
        label
        tagType
      }
    }
  }
`

export const GET_PATHWAY = gql`
  query GetPathway($id: ID!) {
    pathway(id: $id) {
      content
      contentType
      createdAt
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
      title
      updatedAt
      tags {
        id
        label
        tagType
      }
    }
  }
  
`

export const GET_PATHWAYS = gql`
  query GetPathways {
    pathways {
      content
      contentType
      createdAt
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
      title
      updatedAt
      tags {
        id
        label
        tagType
      }
    }
  }
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

export const GET_USER = gql`
  query GetUser {
    user(id: 1) {
      createdAt
      email
      firstName
      fullName
      id
      lastName
      status
      updatedAt
      userType
      courses {
        id
      }
    }
  }
`

export const GET_USERS = gql`
  query GetUsers {
    users {
      createdAt
      email
      firstName
      fullName
      id
      lastName
      status
      updatedAt
      userType
      courses {
        id
      }
    }
  }
 ` 