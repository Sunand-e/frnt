import { gql } from '@apollo/client';

export const ADD_USER_TO_GROUP = gql`
  mutation AddUserToGroup() {
    addUserToGroup(input: {params: {userId: "", isGroupLeader: false, groupId: ""}}) {
      membership {
        group {
          id
        }
      }
    }
  }
`

export const ASSIGN_TENANT_ADMIN = gql`
  mutation AssignTenantAdmin() {
    assignTenantAdmin(input: {params: {userType: "", id: ""}}) {
      user {
        id
      }
    }
  }
`

export const CREATE_CERTIFICATE_TEMPLATE = gql`
  mutation CreateCertificateTemplate($data: ) {
    createCertificateTemplate(input: {params: {data: ""}}) {
      certificateTemplate {
        id
      }
      message
    }
  }
`

export const CREATE_COURSE = gql`
  mutation CreateCourse() {
    createCourse(input: {params: {title: "", itemType: "", content: "", certificateProperties: "", certificateTemplateId: "", childrenIds: "", prerequisites: ""}}) {
      contentItem {
        id
      }
      message
    }
  }
`

export const CREATE_GROUP = gql`
  mutation CreateGroup() {
    createGroup(input: {params: {name: "", parentId: ""}}) {
      group {
        id
      }
    }
  }
`

export const CREATE_LESSON = gql`
  mutation CreateLesson() {
    createLesson(input: {params: {title: "", itemType: "", content: "", parentIds: "", prerequisites: "", imageId: "", iconId: "", contentType: ""}}) {
      contentItem {
        id
      }
      message
    }
  }
`

export const CREATE_LIBRARY_ITEM = gql`
  mutation CreateLibraryItem() {
    createLibraryItem(input: {params: {title: "", itemType: "", contentType: "", content: "", childrenIds: "", iconId: "", id: "", imageId: ""}}) {
      contentItem {
        id
      }
      message
    }
  }
`

export const CREATE_PATHWAY = gql`
  mutation CreatePathway() {
    createPathway(input: {params: {title: "", itemType: "", content: "", certificateProperties: "", certificateTemplateId: "", childrenIds: "", iconId: "", contentType: "", imageId: "", id: "", parentIds: "", prerequisites: ""}}) {
      clientMutationId
    }
  }
`

export const CREATE_QUESTION = gql`
  mutation CreateQuestion() {
    createQuestion(input: {params: {contentItemId: "", questionType: "", answers: "", content: "", iconId: "", order: 10}}) {
      question {
        id
      }
    }
  }
`

export const CREATE_QUIZ = gql`
  mutation CreateQuiz() {
    createQuiz(input: {params: {title: "", itemType: "", certificateProperties: "", certificateTemplateId: "", childrenIds: "", content: "", contentType: "", iconId: "", id: "", imageId: "", order: 10, parentIds: "", prerequisites: ""}}) {
      message
      contentItem {
        id
      }
    }
  }
`

export const CREATE_SECTION = gql`
  mutation CreateSection() {
    createSection(input: {params: {title: "", itemType: "", childrenIds: "", content: "", contentType: "", iconId: "", imageId: "", order: 10, parentIds: "", prerequisites: ""}}) {
      message
      contentItem {
        id
      }
    }
  }
`

export const CREATE_TAG = gql`
  mutation CreateTag() {
    createTag(input: {params: {label: "", tagType: ""}}) {
      tag {
        id
      }
    }
  }
`

export const CREATE_TOPIC = gql`
  mutation CreateTopic() {
    createTopic(input: {params: {label: "", tagType: ""}}) {
      tag {
        id
      }
    }
  }
`

export const CREATE_USER = gql`
  mutation CreateUser() {
    createUser(input: {params: {firstName: "", lastName: "", email: ""}})
  }
`

export const DELETE_CERTIFICATE_TEMPLATE = gql`
  mutation DeleteCertificateTemplate() {
    deleteCertificateTemplate(input: {id: ""}) {
      message
      certificateTemplate {
        id
      }
    }
  }
`

export const DELETE_COURSE = gql`
  mutation DeleteCourse() {
    deleteCourse(input: {id: ""}) {
      contentItem {
        id
      }
    }
  }
`

export const DELETE_LESSON = gql`
  mutation DeleteLesson() {
    deleteLesson(input: {id: ""}) {
      contentItem {
        id
      }
    }
  }
`

export const DELETE_LIBRARY_ITEM = gql`
  mutation DeleteLibraryItem() {
    deleteLibraryItem(input: {id: ""}) {
      contentItem {
        id
      }
    }
  }
`

export const DELETE_PATHWAY = gql`
  mutation DeletePathway() {
    deletePathway(input: {id: ""}) {
      contentItem {
        id
      }
    }
  }
`

export const DELETE_QUESTION = gql`
  mutation DeleteQuestion() {
    deleteQuestion(input: {params: {id: ""}}) {
      message
    }
  }
`

export const DELETE_QUIZ = gql`
  mutation DeleteQuiz() {
    deleteQuiz(input: {id: ""}) {
      contentItem {
        id
      }
    }
  }
`

export const DELETE_SECTION = gql`
  mutation DeleteSection() {
    deleteSection(input: {id: ""}) {
      clientMutationId
      contentItem {
        id
      }
    }
  }
`

export const DELETE_TAG = gql`
  mutation DeleteTag() {
    deleteTag(input: {id: ""}) {
      message
    }
  }
`

export const DELETE_TOPIC = gql`
  mutation DeleteTopic() {
    deleteTopic(input: {id: ""}) {
      message
    }
  }
`

export const DELETE_USER = gql`
  mutation DeleteUser() {
    deleteUser(input: {id: ""}) {
      clientMutationId
      user {
        id
      }
    }
  }
`

export const ENROLL_COURSE = gql`
  mutation EnrollCourse() {
    enrollCourse(input: {params: {contentItemId: "", groupId: "", userId: ""}}) {
      status
    }
  }
`

export const REMOVE_ENROLLED_COURSE = gql`
  mutation RemoveEnrolledCourse() {
    removeEnrolledCourse(input: {params: {contentItemId: "", userId: "", groupId: ""}}) {
      clientMutationId
      status
    }
  }
`

export const REMOVE_USER_FROM_GROUP = gql`
  mutation RemoveUserFromGroup() {
    removeUserFromGroup(input: {params: {userId: "", groupId: ""}}) {
      status
      membership {
        id
      }
    }
  }
`

export const UPDATE_CERTIFICATE_TEMPLATE = gql`
  mutation UpdateCertificateTemplate() {
    updateCertificateTemplate(input: {params: {data: "", id: ""}}) {
      certificateTemplate {
        id
      }
      message
    }
  }
`

export const UPDATE_COURSE = gql`
  mutation UpdateCourse() {
    updateCourse(input: {params: {certificateProperties: "", certificateTemplateId: "", childrenIds: "", questionReorder: "", prerequisites: "", parentIds: "", imageId: "", childrenReorder: "", content: "", iconId: "", tagIds: "", title: "", id: ""}}) {
      clientMutationId
      messages
    }
  }
`

export const UPDATE_LESSON = gql`
  mutation UpdateLesson() {
    updateLesson(input: {params: {id: "", parentIds: "", content: "", iconId: "", imageId: "", prerequisites: "", tagIds: "", title: ""}}) {
      clientMutationId
      messages
    }
  }
`

export const UPDATE_LIBRARY_ITEM = gql`
  mutation UpdateLibraryItem() {
    updateLibraryItem(input: {params: {id: "", content: "", iconId: "", imageId: "", prerequisites: "", tagIds: "", title: ""}}) {
      clientMutationId
      messages
      contentItem {
        id
      }
    }
  }
`

export const UPDATE_PATHWAY = gql`
  mutation UpdatePathway() {
    updatePathway(input: {params: {id: "", certificateProperties: "", certificateTemplateId: "", childrenIds: "", childrenReorder: "", content: "", iconId: "", imageId: "", prerequisites: "", tagIds: "", title: ""}}) {
      messages
      contentItem {
        id
      }
    }
  }
`

export const UPDATE_QUESTION = gql`
  mutation UpdateQuestion() {
    updateQuestion(input: {params: {answers: "", content: "", contentItemId: "", iconId: "", id: "", order: 10, questionType: ""}}) {
      clientMutationId
    }
  }
`

export const UPDATE_QUIZ = gql`
  mutation UpdateQuiz() {
    updateQuiz(input: {params: {id: "", certificateProperties: "", certificateTemplateId: "", childrenIds: "", childrenReorder: "", content: "", iconId: "", imageId: "", parentIds: "", prerequisites: "", questionReorder: "", tagIds: "", title: ""}}) {
      clientMutationId
    }
  }
`

export const UPDATE_SECTION = gql`
  mutation UpdateSection() {
    updateSection(input: {params: {id: "", childrenIds: "", childrenReorder: "", content: "", iconId: "", parentIds: "", imageId: "", prerequisites: "", tagIds: "", title: ""}}) {
      clientMutationId
    }
  }
`

export const UPDATE_USER = gql`
  mutation UpdateUser() {
    updateUser(input: {params: {firstName: "", lastName: "", email: "", id: "e"}}) {
      user {
        id
      }
    }
  }
`

export const UPDATE_USER_CONTENT_STATUS = gql`
  mutation UpdateUserContentStatus() {
    updateUserContentStatus(input: {params: {userId: "", contentItemId: "", status: ""}}) {
      status
    }
  }
`