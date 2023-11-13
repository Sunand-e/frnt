import { 
  InMemoryCache,
  makeVar,
} from '@apollo/client'
import getJWT from '../utils/getToken'
import possibleTypes from './possibleTypes.json'
import { relayStylePagination } from "@apollo/client/utilities";

const typePolicies = {
  
  Query: {
    fields: {
      courses: relayStylePagination(),
    },
  },
  Group: {
    merge: true,
  },
  Tag: {
    merge: true,
  },
  UserContentConnection: {
    merge: true,
  },
  UserContentEdge: {
    merge: true,
    keyFields: (object, context) => {
      return `UserContentEdge:${object.userId}:${object.node.id}`
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
  title: null,
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





// Initializes to true if localStorage includes a 'token', false otherwise
export const isLoggedInVar = makeVar<boolean>(typeof window !== "undefined" && !!getJWT() || null)
// export const actAsUserVar = makeVar<string>(localStorage.getItem('actAsToken') || null)

const cache = new InMemoryCache({
  possibleTypes,
  typePolicies
})

export default cache