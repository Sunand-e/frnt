import { gql, ApolloClient, ApolloLink, createHttpLink, NormalizedCacheObject } from '@apollo/client';
import { RestLink } from 'apollo-link-rest';
import { setContext } from '@apollo/client/link/context';
import { onError } from "@apollo/client/link/error";
import getConfig from 'next/config'
import cache from './cache';

const {publicRuntimeConfig} = getConfig()
const {API_URL} = publicRuntimeConfig
const {UPLOAD_API_URL} = publicRuntimeConfig

const httpLink = createHttpLink({
  uri: API_URL,
  // credentials: "include", (response header must include Access-Control-Allow-Credentials: true)
});

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
    token = localStorage.getItem('token');
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
  authLink.concat(httpLink),
])

export const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  link,
  connectToDevTools: true,
  cache,
  // typeDefs
  resolvers: {
    Group: {
      _deleted: group => Boolean(group._deleted),
    },
    ContentItem: {
      _deleted: course => Boolean(course._deleted),
    }

  },

});
