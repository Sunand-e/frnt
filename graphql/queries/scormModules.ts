import { gql } from "@apollo/client"

export const ScormModuleFragment = gql`
  fragment ScormModuleFragment on ScormModule {
    id
    createdAt
    launchUrl
    manifestData
    title
    updatedAt
    deletedAt
    contentType
    _deleted @client
  }
`

export const GET_SCORM_MODULE = gql`
  query GetScormModule(
    $id: String,
  ) {
    scormModule(id: $id) {
      ...ScormModuleFragment
    }
  }
  ${ScormModuleFragment}
` 


export const GET_SCORM_MODULES = gql`
  query GetScormModules(
    $where: JSON,
  ) { 
    scormModules(where: $where) {
      ...ScormModuleFragment
    }
  }
  ${ScormModuleFragment}
`