import { useRouter } from 'next/router'
import { Notices } from '../../../components/common/Notices'
import CoursesTable from '../../../components/courses/CoursesTable/CoursesTable'
import { useContext } from 'react'
import { ModalContext } from '../../../context/modalContext'
import usePageTitle from '../../../hooks/usePageTitle'
import {Add} from "@styled-icons/fluentui-system-filled/Add";
import useHeaderButtons from "../../../hooks/useHeaderButtons";


const AddButton = () => (
  <>
    <span className='hidden lg:block'>Create new course</span>
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
    // [<AddButton />, '/admin/courses/create']
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
