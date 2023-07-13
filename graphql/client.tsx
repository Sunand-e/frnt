import { ApolloClient, ApolloLink, createHttpLink, NormalizedCacheObject } from '@apollo/client';
import { RestLink } from 'apollo-link-rest';
import { setContext } from '@apollo/client/link/context';
import { onError } from "@apollo/client/link/error";
import getConfig from 'next/config'
import cache from './cache';
import getJWT from '../utils/getToken';
import dayjs from 'dayjs';

const {publicRuntimeConfig} = getConfig()
const {API_URL} = publicRuntimeConfig
const {UPLOAD_API_URL} = publicRuntimeConfig

const httpLink = createHttpLink({
  uri: API_URL,
  // credentials: "include", (response header must include Access-Control-Allow-Credentials: true)
});

const afterwareLink = new ApolloLink((operation, forward) => {
  return forward(operation).map((response) => {
    const context = operation.getContext()
    const latestClientVersion = context.response.headers.get('x-latest-client-version')
    const clientVersion = localStorage.getItem('client_version')

    if(latestClientVersion && !clientVersion || dayjs(latestClientVersion).diff(clientVersion) > 0) {
      localStorage.setItem('client_version', latestClientVersion)
      fetch(window.location.href, { cache: "reload" })
      location.reload()
    }
    return response
  })
})
// const delay = setContext(
//   request => {
//     new Promise<void>((success, fail) => {
//       setTimeout(() => {
//         if (typeof window !== 'undefined') {
//         }
      
//         success()
//       }, 800)
//     })
//   }
// )


// export const typeDefs = gql`
//   extend type Query {
//     libraryStatus: String!
//   }
// `;

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  let token: string

  if (typeof window !== 'undefined') {
    token = getJWT();
  }
  // const token = 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoiY2E2ODEwZjItYzRmOS00NDViLTg1MTYtY2UxNzM3M2IyNjI5In0.qJhqzt8ogGJayTCQIZJS-FWaT-3ksmqw6qo_KLE8jmY'
  // return the headers to the context so httpLink can read them

  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "",
      // authorization: token || '',

    }
  }
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${JSON.stringify(locations)}, Path: ${path}`,
      ),
    );

  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const restLink = new RestLink({ uri: UPLOAD_API_URL });


const link = ApolloLink.from([
  // delay,
  errorLink,
  restLink,
  afterwareLink.concat(authLink.concat(httpLink)),
])

const typesWithDeleted = ['ContentItem', 'ScormPackage', 'Group', 'Role', 'User', 'Tag', 'Tenant', 'Event']

const resolvers = typesWithDeleted.reduce((accumulator, value) => {
  return {
    ...accumulator, 
    [value]: { _deleted: item => Boolean(item._deleted) }
  }
}, {})

 
export const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  link,
  connectToDevTools: true,
  cache,
  // typeDefs
  resolvers
});
