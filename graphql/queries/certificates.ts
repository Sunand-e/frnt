import { gql } from '@apollo/client';
import { UserContentConnectionFragment, UserContentFragment } from './users';

export const CertificateFragment = gql`
  fragment CertificateFragment on Certificate {
    isScored
    course {
      id
      title
    }
    courseUserContent {
      ...UserContentFragment
    }
    moduleUserContents {
      ...UserContentConnectionFragment
    }
    score
    logoUrl
  }
  ${UserContentFragment}
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
