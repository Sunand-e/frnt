import { useRouter } from 'next/router'
import { Notices } from '../../../components/common/Notices'
import CoursesTable from '../../../components/courses/CoursesTable/CoursesTable'
import { useContext, useEffect } from 'react'
import usePageTitle from '../../../hooks/usePageTitle'
import useHeaderButtons from "../../../hooks/useHeaderButtons";
import useUserHasCapability from '../../../hooks/users/useUserHasCapability'
import ButtonAdd from '../../../components/common/ButtonAdd'

const AdminCourses = () => {

  usePageTitle({
    title: 'Courses'
  })

  const { isSuperAdmin, userHasCapability, tenantLevelCapabilityArray } = useUserHasCapability()
  const showCreateButton = userHasCapability([
    'CreateCourse',
  ])
  
  useHeaderButtons([
    ...(showCreateButton ? [{
      id: 'createCourse',
      component: <ButtonAdd action='/admin/courses/create' text='Create new course' />
    }] : []),
  ])

  const ready = !!tenantLevelCapabilityArray.length || isSuperAdmin
  const router = useRouter()
  
  useEffect(() => {
    if(ready) {
      if(!(userHasCapability('UpdateCourse') || userHasCapability('ReorderCourses'))) {
        router.push('/')
      }
    }
  },[ready])


  // useHeaderButtons(
    // <ButtonAdd action='/admin/courses/create' text='Create new course' />
  // )


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
