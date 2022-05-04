import Head from 'next/head'
import usePageTitle from '../../../hooks/usePageTitle'

const AdminCourseCategories = () => {
  
  usePageTitle({ title: 'Course Categories' })
  
  return (
    <>
      <Head>
        <title>Membership Academy</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </>
  )
}



export default AdminCourseCategories