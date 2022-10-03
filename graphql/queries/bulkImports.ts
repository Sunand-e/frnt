import { gql } from '@apollo/client';

export const BulkImportFragment = gql`
  fragment BulkImportFragment on BulkImport {
    id
    name
    createdAt
    updatedAt
    uploadedBy {
      email
      firstName
      id
    }
    users {
      email
      firstName
      id
    }
  }
`

export const GET_BULK_IMPORT = gql`
  query GetBulkImport($id: ID!) {
    bulkImport(id: $id) {
      ...BulkImportFragment
    }
  }
  ${BulkImportFragment}
`
export const GET_BULK_IMPORTS = gql`
  query GetBulkImports {
    bulkImports {
      ...BulkImportFragment
    }
  }
  ${BulkImportFragment}
`
