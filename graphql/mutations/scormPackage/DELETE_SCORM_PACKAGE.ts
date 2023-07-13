import { gql } from '@apollo/client';

export const DELETE_SCORM_PACKAGE = gql`
  mutation DeleteScormPackage(
    $id: ID!
  ) {
    deleteScormPackage(
      id: $id
    ) {
      scormPackage {
        id,
        _deleted @client
      }
      usage
      success
      message
    }
  }
`;
