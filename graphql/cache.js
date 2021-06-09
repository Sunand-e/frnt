import { 
  InMemoryCache,
  makeVar,
} from '@apollo/client';
import possibleTypes from '../graphql/possibleTypes.json'
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

export const allContentVar = makeVar([]);
export const latestContentVar = makeVar([]);
export const libraryVar = makeVar([]);
export const dashVar = makeVar([]);
export const contentTagsVar = makeVar([]);
export const eventsVar = makeVar([]);

const cache = new InMemoryCache({
  possibleTypes,
  typePolicies,
})

export default cache;