import { gql } from '@apollo/client';

export const DELETE_SCORM_MODULE = gql`
  mutation DeleteScormModule(
    $id: ID!
  ) {
    deleteScormModule(
      id: $id
    ) {
      scormModule {
        id,
        _deleted @client
      }
      usage
      success
      message
    }
  }
`;
