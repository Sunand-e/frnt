import { useContext, useEffect } from 'react'
import Button from '../components/common/Button'
import CourseCompleted from '../components/courses/CourseView/CourseCompleted'
import CourseFeedbackForm from '../components/courses/CourseView/CourseFeedbackForm'
import CourseItemView from '../components/courses/CourseView/CourseItemView'
import PrevNextButtons from '../components/courses/CourseView/PrevNextButtons'
import { TenantContext } from '../context/TenantContext'
import useHeaderButtons from '../hooks/useHeaderButtons'
import useGetCurrentUser from '../hooks/users/useGetCurrentUser'
import useGetUserCourse from '../hooks/users/useGetUserCourse'
import useUserHasCapability from '../hooks/users/useUserHasCapability'
import { useViewStore } from '../hooks/useViewStore'
import CourseLayout from '../layouts/CourseLayout'
import { handleModal } from '../stores/modalStore'
import { useRouter } from '../utils/router'

const CoursePage = () => {
  /*
    Our useRouter is a modified version of nextJS's useRouter, as router.query is only available in SSR applications.
    See: https://stackoverflow.com/a/56695180/4274008, https://github.com/vercel/next.js/issues/4804
  */
  const router = useRouter()
  const { id, cid: contentId, completed } = router.query
  const { userHasCapability } = useUserHasCapability()
  const showEditButton = userHasCapability([
    'UpdateCourse',
  ])
    
  const { user } = useGetCurrentUser();
  const { courseEdge } = useGetUserCourse(id)
  const tenant = useContext(TenantContext)

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

  const openCourseFeedbackFormInModal = () => {
    handleModal({
      size: 'lg',
      title: "Course feedback form",
      content: (
        <CourseFeedbackForm modal={true} />
      )
    })
  }
  

  // usePageTitle({ title: `Course${course?.title ? `: ${course?.title}` : ''}`})

  useHeaderButtons([
    ...( courseEdge?.node.settings.showSendFeedbackButton &&
      tenant?.courses.showSendCourseFeedbackButton ? [{
      id: 'sendCourseFeedback',
      component: <Button onClick={openCourseFeedbackFormInModal}>Send feedback</Button>,
      order: 1
    }] : []),
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