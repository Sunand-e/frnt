import type { AppProps } from 'next/app'
import type { Page } from '../types/page'

import {useState, useEffect, createContext, ReactNode} from 'react'
import LoginLayout from '../layouts/LoginLayout'
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
  isLoggedInVar,
  headerButtonsVar
} from '../graphql/cache'

import { addIconsToLibrary } from "../fontawesome";
import { GET_ALL_CONTENT } from '../graphql/queries/GET_ALL_CONTENT';
import { GET_DASHBOARD } from '../graphql/queries/GET_DASHBOARD';
import { GET_LIBRARY } from '../graphql/queries/GET_LIBRARY';

import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css' // Import the CSS
config.autoAddCss = false // Tell Font Awesome to skip adding the CSS automatically since it's being imported above

import "@fullcalendar/common/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
import "react-grid-layout/css/styles.css"
import "react-resizable/css/styles.css"

import '../styles/globals.scss'
import 'react-toastify/dist/ReactToastify.css';
import '../styles/toastify-overrides.css';

import { client } from '../graphql/client'
import { useRouter } from 'next/router'
import { ModalProvider } from '../context/modalContext'
import DefaultLayout from '../layouts/DefaultLayout'

addIconsToLibrary()

export const QueriesContext = createContext({queries:{}});

interface PagePropertiesType {
  Component: Page,
}
type AppPropsExtended = AppProps & PagePropertiesType 


const App = ({ Component: PageComponent, pageProps }: AppPropsExtended) => {

  const router = useRouter();
  const {asPath,route,pathname } = router

  // Clear header buttons on route change
  useEffect(() => {
    headerButtonsVar(null)
  },[route])

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
    return <DefaultLayout
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
    
  // On page change, check if it's an admin page and change the reactive 'viewVar' if necessary
  useEffect(() => {
    const checkIfAdminPage = () => {
      console.log('router.pathname')
      console.log(router.pathname.startsWith('/admin'))
      viewVar({
        isAdmin: router.pathname.startsWith('/admin'),
        ...viewVar()
      })
    }
    checkIfAdminPage()
    
    router.events.on('routeChangeStart', checkIfAdminPage); // add listener

    return () => {
      router.events.off('routeChangeStart', checkIfAdminPage); // remove listener
    } 
  }, []);

  return (
    <>
    <ApolloProvider client={client}>
        <QueriesContext.Provider value={{queries}}>
          <ModalProvider>
            {
              layout
            }
          </ModalProvider>
        </QueriesContext.Provider>
      </ApolloProvider>
    </>
  )
}

export default App
