import Head from 'next/head'
import PageTitle from '../../../components/PageTitle.js';

const AdminCourseCategories = () => {
  return (
    <>
      <Head>
        <title>Membership Academy</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageTitle title="Course Categories" />
    </>
  )
}

AdminCourseCategories.navState = {
  topLevel: 'courses',
  secondary: 'categories'
}

export default AdminCourseCategories