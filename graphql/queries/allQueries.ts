import { gql } from '@apollo/client';
import { UserQuizAttemptFragment } from './quizzes';
import { UserFragment } from './users';

export const ContentItemTagEdgeFragment = gql`
  fragment ContentItemTagEdgeFragment on ContentItemTagEdge {
    order
    contentItemId
    node {
      id
      tagType
      label
      image {
        id
        location
      }
    }
  }
`

export const ContentFragment = gql`
  fragment ContentFragment on ContentItem {
    content
    contentType
    createdAt
    settings
    shared
    order
    image {
      location
      id
      altText
      properties
      title
      fileName
    }
    id
    icon {
      provider
      properties
      id
    }
    tags {
      edges {
        order
        contentItemId
        node {
          id
          label
          tagType
        }
      }
    }
    itemType
    prerequisites
    title
    updatedAt
    _deleted @client
    _isOptimistic @client
  }
`

export const ResourceFragment = gql`
  fragment ResourceFragment on ContentItem {
    ...ContentFragment
    document {
      id
      mediaType
      location
      fileName
    }
    audio {
      id
      mediaType
      location
      fileName
    }
  }
  ${ContentFragment}
`

export const LessonFragment = gql`
  fragment LessonFragment on ContentItem {
    ...ContentFragment
    parents {
      id
    }
  }
  ${ContentFragment}
`

export const QuestionFragment = gql`
  fragment QuestionFragment on Question {
    answers
    content
    createdAt
    updatedAt
    settings
    id
    questionType
    order
  }
`

export const QuizFragment = gql`
  fragment QuizFragment on ContentItem {
    ...ContentFragment
    parents {
      id
    }
    questions {
      ...QuestionFragment
    }
  }
  ${QuestionFragment}
  ${ContentFragment}
`

export const SectionChildrenFragment = gql`
  fragment SectionChildrenFragment on ContentItem {
    children {
      __typename
      id
      _deleted @client
    }
  }
`

export const SectionFragment = gql`
  fragment SectionFragment on ContentItem {
    ...ContentFragment
    ...SectionChildrenFragment
  }
  ${ContentFragment}
  ${SectionChildrenFragment}
`

export const CourseFragment = gql`
  fragment CourseFragment on ContentItem {
    ...ContentFragment
    sections {
      ...SectionFragment
    }
  }
  ${ContentFragment}
  ${SectionFragment}
`
export const PathwayFragment = gql`
  fragment PathwayFragment on ContentItem {
    ...ContentFragment
    children {
      ...CourseFragment
    }
  }
  ${ContentFragment}
  ${CourseFragment}
`
export const ContentTitleAndTypeFragment = gql`
  fragment ContentTitleAndTypeFragment on ContentItem {
    id
    title
    contentType
    itemType
    parents {
      id
    }
  }
`

export const GET_COURSE = gql`
  query GetCourse($id: ID!) {
    course(id: $id) {
      ...CourseFragment
      sections {
        ...SectionFragment
      }
    }
  }
  ${CourseFragment}
  ${SectionFragment}
  ${ContentFragment}
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
      nodes {
        ...SectionFragment
      }
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

export const GET_RESOURCE = gql`
  query GetResource($id: ID!) {
    resource(id: $id) {
      ...ResourceFragment
    }
  }
  ${ResourceFragment}
`

export const GET_RESOURCES = gql`
  query GetResources($first: Int, $after: String) {
    resources(first: $first, after: $after) {
      totalCount
      edges {
        userId
        node {
          ...ResourceFragment
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
  ${ResourceFragment}
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
  query GetPathways($first: Int, $after: String) {
    pathways(first: $first, after: $after) {
      totalCount
      edges {
        userId
        node {
          ...PathwayFragment
          id
          title
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
  ${PathwayFragment}
`;

export const GET_QUIZ = gql`
  query GetQuiz($id: ID!) {
    quiz(id: $id) {
      ...QuizFragment
    }
  }
  ${QuizFragment}
`

export const GET_QUIZZES = gql`
  query GetQuizzes {
    quizzes {
      edges {
        attempts {
          ...UserQuizAttemptFragment
        }
        userId
        node {
          ...QuizFragment
        }
      }
    }
  }
  ${QuizFragment}
  ${UserQuizAttemptFragment}
`
