import { useEffect, useContext } from 'react'
import Head from 'next/head'
// import { useRouter } from 'next/router'
import { useRouter } from '../utils/router';
import { useApolloClient, useReactiveVar, gql, useLazyQuery } from '@apollo/client';
import { QueriesContext } from '../context/QueriesContext';
import PageContent from './PageContent';
import usePageTitle from '../hooks/usePageTitle';

export default function ContentTypePage({type, setData, children}) {
  
  /*
    Our useRouter is a modified version of nextJS's userouter, as router.query is only available in SSR applications.
    See: https://stackoverflow.com/a/56695180/4274008, https://github.com/vercel/next.js/issues/4804
  */
 
  const router = useRouter()
  const client = useApolloClient();
  
  const { id } = router.query
  const idString = `${type}:{"slug":"${id}"}`


  const camelCaseType = type.charAt().toLowerCase() + type.slice(1);

  const queries = useContext(QueriesContext);


  return (
    <>
      <Head>
        <title>Membership Academy</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PageContent>
        {children}
      </PageContent>
    </>
  )
  
}