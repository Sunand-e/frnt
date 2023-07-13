import { gql } from "@apollo/client"

export const ScormPackageFragment = gql`
  fragment ScormPackageFragment on ScormPackage {
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

export const GET_SCORM_PACKAGE = gql`
  query GetScormPackage(
    $id: String,
  ) {
    scormPackage(id: $id) {
      ...ScormPackageFragment
    }
  }
  ${ScormPackageFragment}
` 


export const GET_SCORM_PACKAGES = gql`
  query GetScormPackages(
    $where: JSON,
  ) { 
    scormPackages(where: $where) {
      ...ScormPackageFragment
    }
  }
  ${ScormPackageFragment}
`