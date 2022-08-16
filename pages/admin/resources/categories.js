import Head from 'next/head'
import usePageTitle from '../../../hooks/usePageTitle'

const AdminLibraryCategories = () => {
  
  usePageTitle({ title: 'Library Categories' })
  
  return (
    <>
      <Head>
        <title>Membership Academy</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </>
  )
}

AdminLibraryCategories.navState = {
  topLevel: 'library',
  secondary: 'categories'
}

export default AdminLibraryCategories