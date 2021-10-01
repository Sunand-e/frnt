import { gql } from '@apollo/client';


export const CREATE_CERTIFICATE_TEMPLATE = gql`
  mutation CreateCertificateTemplate(
    $data: JSON!
  ) {
    createCertificateTemplate(
      input: {
        data: $data
      }
    ) {
      certificateTemplate {
        id
      }
      message
    }
  }
`;
