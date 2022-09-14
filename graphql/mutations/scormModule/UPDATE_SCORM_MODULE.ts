import { gql } from '@apollo/client';
import { ScormModuleFragment } from '../../queries/scormModules';


export const UPDATE_SCORM_MODULE = gql`
  mutation UpdateScormModule(
    $id: ID!
    $title: String
  ) {
    updateScormModule(
      input: {
        id: $id
        title: $title

      }
    ) {
      scormModule {
        ...ScormModuleFragment
      }
    }
  }
  ${ScormModuleFragment}
`;
