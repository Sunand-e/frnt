import { useReactiveVar } from '@apollo/client'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Button from '../../../components/Button'
import { Notices } from '../../../components/Notices'
import { headerButtonsVar, viewVar } from '../../../graphql/cache'
import CoursesTable from '../../../components/admin/courses/CoursesTable/CoursesTable'
import { useContext, useEffect } from 'react'
import { ModalContext } from '../../../context/modalContext'
import usePageTitle from '../../../hooks/usePageTitle'
import {Add} from "@styled-icons/fluentui-system-filled/Add";
import useHeaderButtons from "../../../hooks/useHeaderButtons";


const AddButton = () => (
  <>
    <span className='hidden lg:block'>Add new course</span>
    <span className='block lg:hidden'><Add  width="20" /></span>
  </>
)

const AdminCourses = () => {

  usePageTitle({
    title: 'Courses'
  })

  const router = useRouter()
  
  const { handleModal, closeModal } = useContext(ModalContext);

  useHeaderButtons([
    [<AddButton />, '/admin/courses/setup']
  ])


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
