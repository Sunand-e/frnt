import { useRouter } from '../utils/router'
import CourseLayout from '../layouts/CourseLayout'
import { useEffect, useState } from 'react'
import CourseItemView from '../components/courses/CourseView/CourseItemView'
import useGetCurrentUser from '../hooks/users/useGetCurrentUser'
import Button from '../components/common/Button'
import PrevNextButtons from '../components/courses/CourseView/PrevNextButtons'
import CourseCompleted from '../components/courses/CourseView/CourseCompleted'
import useGetUserCourse from '../hooks/users/useGetUserCourse'
import useUserHasCapability from '../hooks/users/useUserHasCapability'
import { useViewStore } from '../hooks/useViewStore'
import useHeaderButtons from '../hooks/useHeaderButtons'

const CoursePage = () => {
  /*
    Our useRouter is a modified version of nextJS's useRouter, as router.query is only available in SSR applications.
    See: https://stackoverflow.com/a/56695180/4274008, https://github.com/vercel/next.js/issues/4804
  */
  const router = useRouter()
  const { id, cid: contentId, completed } = router.query
  const { userHasCapability } = useUserHasCapability()
  const showEditButton = userHasCapability([
    'UpdateRole',
  ])
    
  const { user } = useGetCurrentUser();
  const { courseEdge } = useGetUserCourse(id)
  
  const showCompletedPage = !contentId && completed && courseEdge.status === 'completed'
  useEffect(() => {
    useViewStore.setState({
      isSlimNav: true,
      showSecondaryNav: false,
    })
  },[])

  const editCourse = () => {
    router.push({
      pathname: `/admin/courses/edit`,
      query: {
        id,
        ...(contentId && {cid: contentId})
      }
    })
  }

  // usePageTitle({ title: `Course${course?.title ? `: ${course?.title}` : ''}`})

  useHeaderButtons([
    ...(showEditButton ? [{
      id: 'editCourse',
      component: <Button onClick={editCourse}>Edit Course</Button>,
      order: 1
    }] : []),
    ...(user ? [{
      id: 'prevNextButtons',
      component: <PrevNextButtons />,
      order:5
    }]: [])
  ],)
  
  return (
    <>
      {showCompletedPage ? (
        <CourseCompleted />
      ) : (
        user && <CourseItemView />
      )}
    </>
  )
}

CoursePage.navState = {
  topLevel: 'courses',
  secondary: 'courses'
}

CoursePage.getLayout = page => (
  <CourseLayout
    navState={CoursePage.navState || {}}
    page={page}
  />
)

export default CoursePage