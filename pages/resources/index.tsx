import Head from 'next/head'
import usePageTitle from '../../hooks/usePageTitle'
import ResourceLibrary from '../../components/resources/ResourceLibrary/ResourceLibrary';

const Library = ({queries}) => {

  usePageTitle({ title: 'Resource Library' })
  
  return (
    <>
      <Head>
        <title>Zanda360</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <ResourceLibrary />
    </>
  )
}

Library.navState = {
  topLevel: 'library',
  secondary: 'overview'
}

export default Library