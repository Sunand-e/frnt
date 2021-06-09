import { gql } from '@apollo/client';

export const DocumentMetaFragment = gql`
fragment DocumentMeta on Document {
  sm_linked_documents {
    sm_download_icon {
      name
      provider
      class
      search_terms
      value
    }
    sm_doc_file_attachment
    sm_doc_title
    sm_doc_type_radio {
      id
      label
      value
    }
    sm_doc_url
  }
}
`