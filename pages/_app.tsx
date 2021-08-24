import type { AppProps } from 'next/app'
import type { Page } from '../types/page'

import {useState, useEffect, createContext, ReactNode} from 'react'
import Layout from '../components/layouts/Layout'
import LoginLayout from '../components/layouts/LoginLayout'
import { 
  ApolloProvider,
  useLazyQuery,
  useReactiveVar,
} from '@apollo/client';

import {
  viewVar,
  latestContentVar, 
  libraryVar, 
  contentTagsVar,
  allContentVar,
  isLoggedInVar
} from '../graphql/cache'

import { addIconsToLibrary } from "../fontawesome";
import { GET_ALL_CONTENT } from '../graphql/queries/GET_ALL_CONTENT';
import { GET_DASHBOARD } from '../graphql/queries/GET_DASHBOARD';
import { GET_LIBRARY } from '../graphql/queries/GET_LIBRARY';

import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css' // Import the CSS
config.autoAddCss = false // Tell Font Awesome to skip adding the CSS automatically since it's being imported above


import '@wordpress/block-library/build-style/style.css'
import '../styles/globals.scss'
import { client } from '../graphql/client'

addIconsToLibrary()

export const QueriesContext = createContext({queries:{}});

interface PagePropertiesType {
  Component: Page,
}
type AppPropsExtended = AppProps & PagePropertiesType 


const App = ({ Component: PageComponent, pageProps }: AppPropsExtended) => {

  const [title, setTitle] = useState(PageComponent.title)

  const isLoggedIn = useReactiveVar(isLoggedInVar);
  
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
  
  console.log('caused a rerender');

  const loginLayout = (
    <LoginLayout
      pageState={viewVar()}
      navState={PageComponent.navState || {}}
      page={<PageComponent {...pageProps} />}
    />
  )

  const [layout, setLayout]  = useState<ReactNode>(loginLayout)

  const getLayout =
  PageComponent.getLayout || (page => {
    return <Layout
    navState={PageComponent.navState || {}}
    page={page} />
  })

  pageProps.setTitle = setTitle;
  pageProps.queries = queries;
  
  
  useEffect(() => {
    if(allContentData) {
      getLibrary()
      getDashboard()
      latestContentVar(allContentData.courses.slice(0, 4))
      allContentVar(allContentData.courses)
    }
  },[allContentData])

  // Make sure the content tags reactive variable is set when library has loaded
  useEffect(() => {
    if(libraryData) {
      updateContentTagsVar()
      libraryVar(libraryData.courses)
      }
  },[libraryData])
  
  // Only show login if not logged in
  useEffect(() => {
    setLayout(isLoggedIn ? 
      getLayout(<PageComponent {...pageProps} />) :
      loginLayout
    )
  },[isLoggedIn, PageComponent])


  return (
    <>
    <ApolloProvider client={client}>
        <QueriesContext.Provider value={{queries}}>
          {
            layout
          }
        </QueriesContext.Provider>
      </ApolloProvider>
    </>
  )
}

export default App
