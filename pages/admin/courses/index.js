import Head from 'next/head'
import PageTitle from '../../../components/PageTitle';

const AdminCourses = () => {
  return (
    <>
      <Head>
        <title>Membership Academy</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageTitle title="Courses" />
    </>
  )
}

AdminCourses.navState = {
  topLevel: 'courses',
  secondary: 'courses'
}

export default AdminCourses