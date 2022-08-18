import Head from 'next/head'
import usePageTitle from '../../hooks/usePageTitle'
import ContentLibrary from '../../components/ContentLibrary/ContentLibrary';

const Library = ({queries}) => {

  usePageTitle({ title: 'Resource Library' })
  
  return (
    <>
      <Head>
        <title>Membership Academy</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <ContentLibrary />
    </>
  )
}

Library.navState = {
  topLevel: 'library',
  secondary: 'overview'
}

export default Library