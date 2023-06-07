import { gql } from '@apollo/client';
import { UserContentConnectionFragment } from './users';

export const CertificateFragment = gql`
  fragment CertificateFragment on UserContentConnection {
    ...UserContentConnectionFragment
  }
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
