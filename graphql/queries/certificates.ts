import { gql } from '@apollo/client';
import { UserContentConnectionFragment, UserContentEdgeSimpleFragment } from './users';

export const CertificateFragment = gql`
  fragment CertificateFragment on Certificate {
    isScored
    course {
      id
      title
    }
    courseUserContent {
      ...UserContentEdgeSimpleFragment
    }
    moduleUserContents {
      ...UserContentConnectionFragment
    }
    score
    logoUrl
  }
  ${UserContentEdgeSimpleFragment}
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
