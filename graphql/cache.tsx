import { 
  InMemoryCache,
  makeVar,
} from '@apollo/client'
import possibleTypes from './possibleTypes.json'

// generate type policies for all content types
/*
const typePolicyKeyFields = contentTypes.reduce((typePoliciesObject, type) => {
  typePoliciesObject[type.name.replace(/\s/g, '')] = {
    keyFields: ["slug"]
  }
  return typePoliciesObject
}, {})


const typePolicies = {
  ...typePolicyKeyFields,
  Query: {
    fields: {
      // libraryStatus
    }
  }
}
*/

export const navStateVar = makeVar({
  topLevel: '',
  secondary: ''
})
export const viewVar = makeVar({isAdmin:false})
export const pageTitleVar = makeVar({
  title: null,
  subtitle: null,
  editable: null,
  after: null,
  onEdit: () => false
})
export const currentContentItemVar = makeVar({
  type: null,
  id: null,
  title: null,
  updateFunction: (values) => null
})
export const currentCourseItemIdVar = makeVar(null)

export const courseNavigationVar = makeVar(
  {
    expand:false,
    courseItemId:null,
  }
)

export const activeContentBlockVar = makeVar(null)
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
export const isLoggedInVar = makeVar<boolean>(typeof window !== "undefined" && !!localStorage.getItem('token') || null)

const cache = new InMemoryCache({
  possibleTypes,
  typePolicies: {
    Group: {
      merge: true,
    },
  },
})

export default cache