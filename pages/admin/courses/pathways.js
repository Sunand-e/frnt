import Head from 'next/head'
import usePageTitle from '../../../hooks/usePageTitle'

const AdminPathways = () => {

  usePageTitle({ title: 'Pathways' })

  return (
    <>
      <Head>
        <title>Membership Academy</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </>
  )
}

AdminPathways.navState = {
  topLevel: 'courses',
  secondary: 'pathways'
}

export default AdminPathways