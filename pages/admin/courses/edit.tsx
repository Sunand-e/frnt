import { useEffect } from 'react'
import Button from '../../../components/common/Button'
import LoadingSpinner from '../../../components/common/LoadingSpinner'
import CourseEditor from '../../../components/courses/CourseEditor'
import useHeaderButtons from '../../../hooks/useHeaderButtons'
import useGetUserCourse from '../../../hooks/users/useGetUserCourse'
import { useViewStore } from '../../../hooks/useViewStore'
import EditorLayout from '../../../layouts/EditorLayout'
import { useRouter } from '../../../utils/router'
import usePageTitle from '../../../hooks/usePageTitle'

const AdminCoursesEdit = () => {
  /*
    Our useRouter is a modified version of nextJS's useRouter, as router.query is only available in SSR applications.
    See: https://stackoverflow.com/a/56695180/4274008, https://github.com/vercel/next.js/issues/4804
  */
  const router = useRouter()
  const { id, cid: contentId } = router.query
  const { courseEdge } = useGetUserCourse(id)
  const course = courseEdge?.node

  useEffect(() => {
    useViewStore.setState({
      isSlimNav: true,
      showSecondaryNav: false,
    })
  },[])

  usePageTitle({
    title: 'Course builder'
  });
  
  const previewCourse = () => {
    router.push({
      pathname: `/course`,
      query: {
        id,
        ...(contentId && {cid: contentId})
      }
    })
  }

  useHeaderButtons({
    id: 'viewCourse',
    order:8,
    component: <Button onClick={previewCourse}>View course</Button>
  })
  
  return (
    <>
      { course ?
        <CourseEditor /> :
        <LoadingSpinner className='mt-12' text="Loading your course" />
      }
    </>
  )
}

AdminCoursesEdit.navState = {
  topLevel: 'courses',
  secondary: 'courses'
}

AdminCoursesEdit.getLayout = page => (
  <EditorLayout
    navState={AdminCoursesEdit.navState || {}}
    page={page}
  />
)

export default AdminCoursesEdit