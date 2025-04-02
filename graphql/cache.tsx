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
    keyFields: (object: any, context: any) => {
      const contentId = context.readField('id', object.node);
      return `GroupProvisionedContentEdge:${object.groupId}:${contentId}`;
    }
  },
  GroupAssignedContentEdge: {
    merge: true,
    keyFields: (object: any, context: any) => {
      const contentId = context.readField('id', object.node);
      return `GroupAssignedContentEdge:${object.groupId}:${contentId}`;
    }
  },
  ContentGroupProvisionedEdge: {
    merge: true,
    keyFields: (object: any, context: any) => {
      const groupId = context.readField('groupId', object);
      return `ContentGroupProvisionedEdge:${object.contentItemId}:${groupId}`;
    }
  },
  ContentGroupAssignedEdge: {
    merge: true,
    keyFields: (object: any, context: any) => {
      const groupId = context.readField('groupId', object);
      return `ContentGroupAssignedEdge:${object.contentItemId}:${groupId}`;
    }
  },
  UserContentEdge: {
    merge: true,
    keyFields: (object: any, context: any) => {
      const contentId = context.readField('id', object.node);
      return `UserContentEdge:${object.userId}:${contentId}`;
    }
  },
  UserGroupEdge: {
    merge: true,
    keyFields: (object: any, context: any) => {
      const groupId = context.readField('groupId', object);
      return `UserGroupEdge:${object.userId}:${groupId}`;
    }
  },
  GroupUserEdge: {
    merge: true,
    keyFields: (object: any, context: any) => {
      const userId = context.readField('userId', object);
      return `GroupUserEdge:${object.groupId}:${userId}`;
    }
  },
  ContentItemTagEdge: {
    merge: true,
    keyFields: (object: any, context: any) => {
      const tagId = context.readField('id', object.node);
      return `ContentItemTagEdge:${object.contentItemId}:${tagId}`
    }
  },
  ContentItem: {
    fields: {
      children: {
        merge(_existing: any, incoming: any) {
          return incoming
        }
      },
      questions: {
        merge(_existing: any, incoming: any) {
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
  header: null,
  subtitle: null,
  editable: null,
  after: null,
  onEdit: () => false
})

export const currentCourseItemIdVar = makeVar(null)

export const courseNavigationVar = makeVar(
  {
    expand: false,
    courseItemId: null,
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

export const isLoggedInVar = makeVar<boolean>(typeof window !== "undefined" && !!getCookie('jwt_header_payload') || false)
export const actingAsUser = makeVar<boolean>(typeof window !== "undefined" && !!getCookie('actAsUser') || false)

const cache = new InMemoryCache({
  possibleTypes,
  typePolicies
})

export default cache