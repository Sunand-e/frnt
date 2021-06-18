import { gql } from '@apollo/client';

export const WorkshopMetaFragment = gql`
fragment WorkshopMeta on Workshop {
  videoMarkers {
    time
    title
  }
  videoUrl
  smLinkedDocuments {
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