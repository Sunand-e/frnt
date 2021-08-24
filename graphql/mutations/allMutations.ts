import {
 gql } from '@apollo/client';
import { GroupFragment } from '../queries/allQueries';

export const ADD_USER_TO_GROUP = gql`
  mutation AddUserToGroup(
    $userId: ID!,
    $isGroupLeader: Boolean,
    $groupId: ID!
  ) {
    addUserToGroup(
      input: {
        userId: $userId,
        isGroupLeader: $isGroupLeader,
        groupId: $groupId
        }
    ) {
      membership {
        group {
          id
        }
      }
    }
  }
`

export const ASSIGN_TENANT_ADMIN = gql`
  mutation AssignTenantAdmin(
    $userType: String!,
    $id: ID!
  ) {
    assignTenantAdmin(
      input: {
        userType: $userType,
        id: $id
      }
    ) {
      user {
        id
      }
    }
  }
`

export const CREATE_CERTIFICATE_TEMPLATE = gql`
  mutation CreateCertificateTemplate(
    $data: JSON!
  ) {
    createCertificateTemplate(
      input: {
        data: $data
      }
    ) {
      certificateTemplate {
        id
      }
      message
    }
  }
`

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
        id
      }
      message
    }
  }
`

export const CREATE_GROUP = gql`
  mutation CreateGroup(
    $name: String!,
    $parentId: ID
  ) {
    createGroup(
      input: {
        name: $name,
        parentId: $parentId
      }
    ) {
      group {
        createdAt
        id
        name
        updatedAt
        users {
          id
        }
      }
    }
  }
`

export const UPDATE_GROUP = gql`
  mutation UpdateGroup(
    $id: ID!
    $name: String,
    $parentId: ID
  ) {
    updateGroup(
      input: {
        name: $name,
        id: $id
        parentId: $parentId
      }
    ) {
      group {
      ...ClientGroup
      }
    }
  }
  ${GroupFragment}
`
export const DELETE_GROUP = gql`
  mutation DeleteGroup(
    $id: ID!
  ) {
    deleteGroup(
      id: $id
    ) {
      message
    }
  }
`
export const CREATE_LESSON = gql`
  mutation CreateLesson(
    $title: String!,
    $content: JSON,
    $parentIds: JSON,
    $prerequisites: JSON,
    $imageId: ID,
    $iconId: ID
  ) {
    createLesson(
      input: {
        title: $title,
        content: $content,
        parentIds: $parentIds,
        prerequisites: $prerequisites,
        imageId: $imageId,
        iconId: $iconId
      }
    ) {
      lesson {
        id
      }
      message
    }
  }
`

export const CREATE_LIBRARY_ITEM = gql`
  mutation CreateLibraryItem(
    $title: String!,
    $contentType: String 
    $content: JSON,
    $childrenIds: JSON,
    $imageId: ID,
    $iconId: ID
  ) {

    createLibraryItem(
      input: {
        title: $title,
        contentType: $contentType,
        content: $content,
        childrenIds: $childrenIds,
        imageId: $imageId,
        iconId: $iconId
      }
    ) {
      libraryItem {
        id
      }
      message
    }
  }
`

export const CREATE_PATHWAY = gql`
  mutation CreatePathway(
    $title: String!,
    $content: JSON,
    $certificateProperties: JSON,
    $certificateTemplateId: ID,
    $childrenIds: JSON,
    $imageId: ID,
    $iconId: ID
  ) {
    createPathway(
      input: {
        title: $title,
        content: $content,
        certificateProperties: $certificateProperties,
        certificateTemplateId: $certificateTemplateId,
        childrenIds: $childrenIds,
        imageId: $imageId,
        iconId: $iconId
      }
    ) {
      pathway {
        id
      }
    }
  }
`

export const CREATE_USER = gql`
  mutation CreateUser(
    $firstName: String!,
    $lastName: String!,
    $email: String!
  ) {
    createUser(
      input: {
        firstName: $firstName,
        lastName: $lastName,
        email: $email
      }
    ) {
      user {
        id
        firstName
        lastName
        email
      }
    }
  }
`
