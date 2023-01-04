import { useRouter } from 'next/router'
import { Notices } from '../../../components/common/Notices'
import CoursesTable from '../../../components/courses/CoursesTable/CoursesTable'
import { useContext, useEffect } from 'react'
import { ModalContext } from '../../../context/modalContext'
import usePageTitle from '../../../hooks/usePageTitle'
import {Add} from "@styled-icons/fluentui-system-filled/Add";
import useHeaderButtons from "../../../hooks/useHeaderButtons";
import useUserHasCapability from '../../../hooks/users/useUserHasCapability'


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

  const { userType, userHasCapability, userCapabilityArray } = useUserHasCapability()
  const ready = !!userCapabilityArray.length || userType === 'SuperAdmin'
  const router = useRouter()
  
  useEffect(() => {
    if(ready) {
      if(!userHasCapability('UpdateUser')) {
        router.push('/')
      }
    }
  },[ready])


  useHeaderButtons([
    // [<AddButton />, '/admin/courses/create']
  ])


  return (
    (ready && (
    <>
      <Notices />
      <CoursesTable />
    </>
    ))
  )
}



AdminCourses.navState = {
  topLevel: 'courses',
  secondary: 'courses'
}

export default AdminCourses
