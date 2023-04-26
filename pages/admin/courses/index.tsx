import { useRouter } from 'next/router'
import { Notices } from '../../../components/common/Notices'
import CoursesTable from '../../../components/courses/CoursesTable/CoursesTable'
import { useContext, useEffect } from 'react'
import usePageTitle from '../../../hooks/usePageTitle'
import useHeaderButtons from "../../../hooks/useHeaderButtons";
import useUserHasCapability from '../../../hooks/users/useUserHasCapability'

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


  // useHeaderButtons(
    // <ButtonAdd action='/admin/courses/create' text='Create new course' />
  // )


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
