import { gql } from '@apollo/client';
import { ScormPackageFragment } from '../../queries/scormPackages';


export const UPDATE_SCORM_PACKAGE = gql`
  mutation UpdateScormPackage(
    $id: ID!
    $title: String
  ) {
    updateScormPackage(
      input: {
        id: $id
        title: $title

      }
    ) {
      scormPackage {
        ...ScormPackageFragment
      }
    }
  }
  ${ScormPackageFragment}
`;
