import { useState, useEffect } from 'react'
import Head from 'next/head'
import { useQuery, useReactiveVar } from '@apollo/client';
import { useRouter } from '../../utils/router';
import contentTypes from '../../contentTypes';
import ItemCollection from '../../components/ItemCollection';
import SearchFilter from '../../components/SearchFilter';
import SearchResults from '../../components/SearchResults';
import LoadingSpinner from '../../components/LoadingSpinner';
import usePageTitle from '../../hooks/usePageTitle'
import PageContent from '../../components/PageContent';
import ContentLibrary from '../../components/ContentLibrary/ContentLibrary';

const Library = ({queries}) => {

  usePageTitle({ title: 'Content Library' })
  
  return (
    <>
      <Head>
        <title>Membership Academy</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageContent>
        <ContentLibrary />
      </PageContent>
    </>
  )
}

Library.navState = {
  topLevel: 'library',
  secondary: 'overview'
}

export default Library