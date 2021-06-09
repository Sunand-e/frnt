import { gql } from '@apollo/client';

export const WebinarMetaFragment = gql`
fragment WebinarMeta on Webinar {
  videoMarkers {
    time
    title
  }
  videoUrl
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