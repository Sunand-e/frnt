import { 
  InMemoryCache,
  makeVar,
} from '@apollo/client';
import possibleTypes from './possibleTypes.json'
import contentTypes from '../contentTypes'

// generate type policies for all content types
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

export const viewVar = makeVar({});
export const allContentVar = makeVar([]);
export const latestContentVar = makeVar([]);
export const libraryVar = makeVar([]);
export const dashVar = makeVar([]);
export const contentTagsVar = makeVar([]);
export const eventsVar = makeVar([]);
// Initializes to true if localStorage includes a 'token', false otherwise
export const isLoggedInVar = makeVar<boolean>(typeof window !== "undefined" && !!localStorage.getItem('token'));

const cache = new InMemoryCache({
  possibleTypes,
  typePolicies,
})

export default cache;