import Head from 'next/head'
import usePageTitle from '../../../hooks/usePageTitle'

const AdminCourseCategories = () => {
  return (
    <>
      <Head>
        <title>Membership Academy</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      usePageTitle({ title: 'Course Categories' })
    </>
  )
}

AdminCourseCategories.navState = {
  topLevel: 'courses',
  secondary: 'categories'
}

export default AdminCourseCategories