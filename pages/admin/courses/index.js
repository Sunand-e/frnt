import { useReactiveVar } from '@apollo/client'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Button from '../../../components/Button'
import { Notices } from '../../../components/Notices'
import { headerButtonsVar, viewVar } from '../../../graphql/cache'
import CoursesTable from '../../../components/admin/courses/CoursesTable/CoursesTable'
import { useContext, useEffect } from 'react'
import { ModalContext } from '../../../context/modalContext'
import TextInput from '../../../components/BasicTextInput'
import LoadingSpinner from '../../../components/LoadingSpinner'
import CourseCreateModalForm from '../../../components/admin/courses/CourseCreateModalForm'
import usePageTitle from '../../../hooks/usePageTitle'
const AdminCourses = () => {

  usePageTitle({
    title: 'Courses'
  })

  const router = useRouter()
  
  const { handleModal, closeModal } = useContext(ModalContext);

  const handleAddClick = (e) => {
    handleModal({
      title: `Add new course`,
      // content: <BasicTextInput label="Course name" placeholder='Untitled course' />,
      content: <CourseCreateModalForm />,
      buttons: null
    })
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