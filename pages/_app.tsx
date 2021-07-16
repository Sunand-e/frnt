import type { AppProps } from 'next/app'
import type { Page } from '../types/page'

import {useState, useEffect, createContext} from 'react'
import Layout from '../components/layouts/Layout'
import LoginLayout from '../components/layouts/LoginLayout'
import { setContext } from '@apollo/client/link/context';
import { 
  ApolloClient, 
  ApolloProvider, 
  createHttpLink,
  useLazyQuery,
} from '@apollo/client';

import getConfig from 'next/config'
import cache, {
  viewVar,
  latestContentVar, 
  libraryVar, 
  contentTagsVar, 
  eventsVar, 
  dashVar, 
  allContentVar
} from '../graphql/cache'

import { addIconsToLibrary } from "../fontawesome";
import { GET_ALL_CONTENT } from '../graphql/queries/GET_ALL_CONTENT';
import { GET_DASHBOARD } from '../graphql/queries/GET_DASHBOARD';
import { GET_LIBRARY } from '../graphql/queries/GET_LIBRARY';

import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css' // Import the CSS
config.autoAddCss = false // Tell Font Awesome to skip adding the CSS automatically since it's being imported above


import '@wordpress/block-library/build-style/style.css'
import '../styles/globals.css'
import { NextComponentType } from 'next';

const {publicRuntimeConfig} = getConfig()
const {API_URL} = publicRuntimeConfig

addIconsToLibrary()

const httpLink = createHttpLink({
  uri: API_URL,
  // credentials: "include", (response header must include Access-Control-Allow-Credentials: true)
  // useGETForQueries: true
});

// export const typeDefs = gql`
//   extend type Query {
//     libraryStatus: String!
//   }
// `;

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  // const token = localStorage.getItem('token');
  const token = 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoiY2E2ODEwZjItYzRmOS00NDViLTg1MTYtY2UxNzM3M2IyNjI5In0.qJhqzt8ogGJayTCQIZJS-FWaT-3ksmqw6qo_KLE8jmY'
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

export const client = new ApolloClient({
  connectToDevTools: true,
  link: authLink.concat(httpLink),
  cache,
  // typeDefs
});

export const QueriesContext = createContext({queries:{}});

interface PagePropertiesType {
  Component: Page,
}
type AppPropsExtended = AppProps & PagePropertiesType 


const App = ({ Component: PageComponent, pageProps }: AppPropsExtended) => {

  const [title, setTitle] = useState(PageComponent.title)
  const [loggedIn, setloggedIn] = useState(true)

  const updateContentTagsVar = () => {
    if(libraryData) {
      const serializedState = client.cache.extract()
      contentTagsVar(
        Object.values(serializedState).filter(
          item => item.__typename === 'ContentTag'
        )
      )
    }
  }
  // const [data, setData] = useState('aa')
  const [ getLibrary, { 
    loading: loadingLibrary, 
    data: libraryData, 
    error: libraryError 
  } ] = useLazyQuery(GET_LIBRARY, {client})

  const [ getAllContent, { 
    loading: loadingAllContent, 
    data: allContentData, 
    error: allContentError
  } ] = useLazyQuery(GET_ALL_CONTENT, {client})

  const [ getDashboard, { 
    loading: loadingDashboard, 
    data: dashboardData, 
    error: dashboardError
  } ] = useLazyQuery(GET_DASHBOARD, {client})

  const queries = {
    getLibrary,
    getAllContent,
    getDashboard
  }
  
  useEffect(() => {
    if(allContentData) {
      getLibrary()
      getDashboard()
      latestContentVar(allContentData.contentNodes.nodes.slice(0, 4))
      allContentVar(allContentData.contentNodes?.nodes)
    }
  },[allContentData])

  // Make sure the content tags reactive variable is set when library has loaded
  useEffect(() => {
    if(libraryData) {
      updateContentTagsVar()
      libraryVar(libraryData.contentNodes?.nodes)
      }
  },[libraryData])

  
  console.log('caused a rerender');

  const getLayout =
  PageComponent.getLayout || (page => {
    return <Layout 
    pageState={viewVar()}
    navState={PageComponent.navState || {}}
    page={page} />
  })

  pageProps.setTitle = setTitle;
  pageProps.queries = queries;
  
  return (
    <ApolloProvider client={client}>
      <QueriesContext.Provider value={{queries}}>
        { loggedIn 
          ? getLayout(<PageComponent {...pageProps} />)
          : <LoginLayout
            pageState={viewVar()}
            navState={PageComponent.navState || {}}
            page={<PageComponent {...pageProps} />}
          />
        }
      </QueriesContext.Provider>
    </ApolloProvider>
  )
}

export default App
