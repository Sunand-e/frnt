import '../utils/wdyr'
import type { AppProps } from 'next/app'
import type { Page } from '../types/page'

import {useState, useEffect, ReactNode, useMemo} from 'react'
import LoginLayout from '../layouts/LoginLayout'
import { 
  ApolloProvider,
  useReactiveVar,
} from '@apollo/client';

import {
  viewVar,
  isLoggedInVar,
  headerButtonsVar,
  navStateVar
} from '../graphql/cache'

import { addIconsToLibrary } from "../fontawesome";

import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css' // Import the CSS
config.autoAddCss = false // Tell Font Awesome to skip adding the CSS automatically since it's being imported above

import "@fullcalendar/common/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
import "react-grid-layout/css/styles.css"
import "react-resizable/css/styles.css"

import '../styles/globals.scss'
import '../styles/TipTap.scss'
import 'react-toastify/dist/ReactToastify.css';
import '../styles/toastify-overrides.css';

import { client } from '../graphql/client'
import { useRouter } from 'next/router'
import { ModalProvider } from '../context/modalContext'
import DefaultLayout from '../layouts/DefaultLayout'
import { TenantContextProvider } from '../context/TenantContext';
import useBeforeUnload from '../hooks/useBeforeUnload';
import CapabilityCheckWrapper from '../components/app/CapabilityCheckWrapper'
addIconsToLibrary()

interface PagePropertiesType {
  Component: Page & {
    navState
    capabilities
  },
}
type AppPropsExtended = AppProps & PagePropertiesType 

const App = ({ Component: PageComponent, pageProps }: AppPropsExtended) => {

  const router = useRouter()
  
  // Clear header buttons and set nav state reactive variable on route change
  useEffect(() => {
    navStateVar(PageComponent.navState)
    headerButtonsVar(null)
  },[router.route])

  const [title, setTitle] = useState(PageComponent.title)

  const isLoggedIn = useReactiveVar(isLoggedInVar);
  
  // useRouteChange()
  useBeforeUnload()

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
  
  // Show the login form if not logged in
  
  useEffect(() => {
    setLayout(isLoggedIn || PageComponent.isPublicPage ? 
      getLayout(<PageComponent {...pageProps} />) :
      loginLayout
    )
  },[isLoggedIn, PageComponent])

  // After initial render, check if it's an admin page and change the reactive 'viewVar' if necessary
  useEffect(() => {
    const checkIfAdminPage = () => {
      viewVar({
        ...viewVar(),
        isAdmin: router.pathname.startsWith('/admin'),
      })
    }
    checkIfAdminPage()
    router.events.on('routeChangeComplete', checkIfAdminPage); // add listener
    
    return () => {
      router.events.off('routeChangeComplete', checkIfAdminPage); // remove listener
    }
  }, [router.events, router.pathname]);


  const memoedClient = useMemo(() => client, [])
  return (
    <>
    <ApolloProvider client={memoedClient}>
        <TenantContextProvider>
            <ModalProvider>
              <CapabilityCheckWrapper capabilities={PageComponent.capabilities}>
                {
                  layout
                }
              </CapabilityCheckWrapper>
            </ModalProvider>
        </TenantContextProvider>
      </ApolloProvider>
    </>
  )
}

export default App
