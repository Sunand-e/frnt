import { ApolloClient, ApolloLink, createHttpLink, NormalizedCacheObject } from '@apollo/client';
import { RestLink } from 'apollo-link-rest';
import { onError } from "@apollo/client/link/error";
import getConfig from 'next/config'
import cache from './cache';
import dayjs from 'dayjs';
import { isLoggedInVar } from './cache';
import Router from 'next/router';

const {publicRuntimeConfig} = getConfig()
const {API_URL} = publicRuntimeConfig
const {UPLOAD_API_URL} = publicRuntimeConfig

const httpLink = createHttpLink({
  uri: API_URL,
  // credentials: "include", (response header must include Access-Control-Allow-Credentials: true)
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${JSON.stringify(locations)}, Path: ${path}`,
      ),
    );

  if (networkError) console.log(`[Network error]: ${networkError}`);

  const excludedRoutes = ['/accept_invitation', '/lost-password', '/reset-password', '/sign_up', '/confirmation']; 

  if (networkError && 'statusCode' in networkError && networkError.statusCode === 401 && !excludedRoutes.includes(Router.pathname)) {
    isLoggedInVar(false);
    client.clearStore();
    Router.push('/'); // Redirect to login page
  }
});

const restLink = new RestLink({ uri: UPLOAD_API_URL });

const link = ApolloLink.from([
  // delay,
  errorLink,
  restLink,
  httpLink,
])

const typesWithDeleted = ['ContentItem', 'ScormPackage', 'Group', 'Role', 'User', 'Tag', 'Tenant', 'Event']

const resolvers = typesWithDeleted.reduce((accumulator, value) => {
  return {
    ...accumulator, 
    [value]: { 
      _deleted: item => Boolean(item._deleted),
      _isOptimistic: item => Boolean(item._isOptimistic)
    }
  }
}, {}) 
 
export const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  link,
  connectToDevTools: true,
  cache,
  // typeDefs
  resolvers
});
