import { ContentItem } from "../../graphql/generated";

export const contentItemDefaults: ContentItem = {
  __typename: 'ContentItem',
  contentType: null,
  title: '',
  createdAt: '',
  updatedAt: '',
  content: {},
  image: null,
  document: null,
  audio: null,
  icon: null,
  prerequisites: null,
  _deleted: false,
  settings: '',
  shared: false,
  mediaItem: null,
  parents: [],
  users: {
    __typename: 'ContentUserConnection',
    totalCount: 0,
    edges: [],
    pageInfo: {
      hasNextPage:false,
      hasPreviousPage:false
    }
  },
  tags: {
    __typename: 'ContentItemTagConnection',
    totalCount: 0,
    edges: [],
    pageInfo: {
      hasNextPage:false,
      hasPreviousPage:false
    }
  },
  order: 0,
}
