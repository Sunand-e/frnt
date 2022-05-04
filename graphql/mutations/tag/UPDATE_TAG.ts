import { gql } from '@apollo/client';
import { TagFragment } from '../../queries/tags';


// export const UPDATE_TAG = gql`
//   mutation UpdateTag(
//     $id: ID!
//     $label: String,
//     $tagType: String,
//   ) {
//     updateTag(
//       input: {
//         id: $id,
//         label: $label,
//         tagType: $tagType,
//       }
//     ) {
//       tag {
//       ...TagFragment
//       }
//     }
//   }
//   ${TagFragment}
// `;
