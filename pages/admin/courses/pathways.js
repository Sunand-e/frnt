import Head from 'next/head'
import PageTitle from '../../../components/PageTitle.js';

const AdminPathways = () => {
  return (
    <>
      <Head>
        <title>Membership Academy</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageTitle title="Pathways" />
    </>
  )
}

AdminPathways.navState = {
  topLevel: 'courses',
  secondary: 'pathways'
}

export default AdminPathways