import { 
  InMemoryCache,
  makeVar,
} from '@apollo/client'
import { getCookie } from './../utils/cookieUtils';
import possibleTypes from './possibleTypes.json'
const typePolicies = {
  Query: {
    fields: {
      // courses: relayStylePagination(),
    },
  },
  Group: {
    merge: true,
  },
  GroupConnection: {
    merge: true,
  },
  Tag: {
    merge: true,
  },
  UserContentConnection: {
    merge: true,
  },
  UserGroupConnection: {
    merge: true,
  },
  GroupUserConnection: {
    merge: true,
  },
  ContentUserConnection: {
    merge: true,
  },
  GroupProvisionedContentConnection: {
    merge: true,
  },
  GroupAssignedContentConnection: {
    merge: true,
  },
  ContentGroupProvisionedConnection: {
    merge: true,
  },
  ContentGroupAssignedConnection: {
    merge: true,
  },
  GroupProvisionedContentEdge: {
    merge: true,
    keyFields: (object, context) => {
      const contentId = context.readField('id', object.node);
      return `GroupProvisionedContentEdge:${object.groupId}:${contentId}`;
    }
  },
  GroupAssignedContentEdge: {
    merge: true,
    keyFields: (object, context) => {
      const contentId = context.readField('id', object.node);
      return `GroupAssignedContentEdge:${object.groupId}:${contentId}`;
    }
  },
  ContentGroupProvisionedEdge: {
    merge: true,
    keyFields: (object, context) => {
      const groupId = context.readField('groupId', object);
      return `ContentGroupProvisionedEdge:${object.contentItemId}:${groupId}`;
    }
  },
  ContentGroupAssignedEdge: {
    merge: true,
    keyFields: (object, context) => {
      const groupId = context.readField('groupId', object);
      return `ContentGroupAssignedEdge:${object.contentItemId}:${groupId}`;
    }
  },
  UserContentEdge: {
    merge: true,
    keyFields: (object, context) => {
      const contentId = context.readField('id', object.node);
      // Use the subfieldData as needed
      return `UserContentEdge:${object.userId}:${contentId}`;
    }
  },
  UserGroupEdge: {
    merge: true,
    keyFields: (object, context) => {
      const groupId = context.readField('groupId', object);
      return `UserGroupEdge:${object.userId}:${groupId}`;
    }
  },
  GroupUserEdge: {
    merge: true,
    keyFields: (object, context) => {
      const userId = context.readField('userId', object);
      return `GroupUserEdge:${object.groupId}:${userId}`;
    }
  },
  ContentItemTagEdge: {
    merge: true,
    keyFields: (object, context) => {
      const tagId = context.readField('id', object.node);
      return `ContentItemTagEdge:${object.contentItemId}:${tagId}`
    }
  },
  ContentItem: {
    fields: {
      children: {
        merge(existing, incoming) {
          return incoming
        }
      },
      questions: {
        merge(existing, incoming) {
          return incoming
        }
      }
    },
  },
}

export const navStateVar = makeVar({
  topLevel: '',
  secondary: ''
})
export const pageTitleVar = makeVar({
  title: 'Zanda360',
  subtitle: null,
  editable: null,
  after: null,
  onEdit: () => false
})

export const currentCourseItemIdVar = makeVar(null)

export const courseNavigationVar = makeVar(
  {
    expand:false,
    courseItemId:null,
  }
)

export const markCompleteDisabledVar = makeVar(true)
export const mediaItemsVar = makeVar([])
export const allContentVar = makeVar([])
export const latestContentVar = makeVar([])
export const libraryVar = makeVar([])
export const dashVar = makeVar([])
export const contentTagsVar = makeVar([])
export const eventsVar = makeVar([])
export const noticesVar = makeVar([])
export const scormDataVar = makeVar({})
export const headerButtonsVar = makeVar(<></>)

export const isLoggedInVar = makeVar<boolean>(typeof window !== "undefined" && !!getCookie('jwt_header_payload') || null)

const cache = new InMemoryCache({
  possibleTypes,
  typePolicies
})

export default cache