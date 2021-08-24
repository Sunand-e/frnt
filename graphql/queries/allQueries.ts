import { gql } from '@apollo/client';

export const GET_COURSE = gql`
  query GetCourse($id: ID!) {
    course(id: $id) {
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
      order
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

export const CourseFragment = gql`
  fragment ClientCourse on ContentItem {
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
    _deleted @client
  }
`
export const GET_COURSES = gql`
  query GetCourses {
    courses {
      ...ClientCourse
    }
  }
  ${CourseFragment}
`


export const GET_GROUP = gql`
  query GetGroup($id: ID!) {
    group(id: $id) {
      createdAt
      id
      name
      updatedAt
      users {
        id
      }
    }
  }
`


export const GroupFragment = gql`
  fragment ClientGroup on Group {
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
export const GET_GROUPS = gql`
  query GetGroups {
    groups {
      ...ClientGroup
    }
  }
  ${GroupFragment}
`

export const GET_LESSON = gql`
  query GetLesson($id: ID!) {
    lesson(id: $id) {
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
      order
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
      order
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
      order
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
      order
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
      order
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
        order
        questionType
      }
    }
  }
`

export const GET_QUIZZES = gql`
  query GetQuizzes {
    quizzes {
      order
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
        order
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