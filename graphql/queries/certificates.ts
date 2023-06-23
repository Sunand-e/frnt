import { gql } from '@apollo/client';
import { UserContentConnectionFragment, UserContentEdgeFragment } from './users';

export const CertificateFragment = gql`
  fragment CertificateFragment on Certificate {
    isScored
    course {
      id
      title
    }
    courseUserContent {
      ...UserContentConnectionFragment
      # ...UserContentEdgeFragment
    }
    moduleUserContents {
      ...UserContentConnectionFragment
    }
    score
    
  }
  ${UserContentEdgeFragment}
  ${UserContentConnectionFragment}
`

export const GET_CERTIFICATES = gql`
  query GetCertificates {
    certificates {
      ...CertificateFragment
      
    }
  }
  ${CertificateFragment}
`
