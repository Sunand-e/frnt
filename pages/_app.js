import Layout from '../components/layouts/Layout'
import possibleTypes from '../graphql/possibleTypes.json';
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import '../styles/globals.css'
const httpLink = createHttpLink({
  uri: 'http://localhost:8090/graphql',
  credentials: "include",
  // useGETForQueries: true
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    possibleTypes
  })
});

function MyApp({ Component: PageComponent, pageProps }) {


  const getLayout =
  PageComponent.getLayout || (page => {
    return <Layout 
    title={PageComponent.title} 
    subtitle={PageComponent.subtitle}
    sidebar={PageComponent.sidebar}>
      {page}
    </Layout>
  })

  return (
    <ApolloProvider client={client}>
      { getLayout(<PageComponent {...pageProps} />) }
    </ApolloProvider>
  )
}

export default MyApp
