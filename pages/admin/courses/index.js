import { useReactiveVar } from '@apollo/client';
import Head from 'next/head'
import { useRouter } from 'next/router';
import Button from '../../../components/Button';
import { Notices } from '../../../components/Notices';
import PageTitle from '../../../components/PageTitle';
import { headerButtonsVar, viewVar } from '../../../graphql/cache';
import CoursesTable from '../../../components/admin/courses/CoursesTable'
import { useEffect } from 'react';
const AdminCourses = () => {

  const view = useReactiveVar(viewVar);
  
  const router = useRouter()
  
  const handleAddClick = (e) => {
    router.push('/admin/courses/add')
    e.target.blur()
  }
  
  useEffect(() => {

    headerButtonsVar(
      <>
        <Button onClick={handleAddClick}>Add new course</Button>
      </>
    )
  },[])

  return (
    <>
      <PageTitle title="Courses" />
      <Notices />
      <CoursesTable />
    </>
  )
}



AdminCourses.navState = {
  topLevel: 'courses',
  secondary: 'courses'
}

export default AdminCourses