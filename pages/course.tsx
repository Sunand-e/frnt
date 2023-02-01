import { useRouter } from '../utils/router'
import CourseLayout from '../layouts/CourseLayout'
import { headerButtonsVar, viewVar } from '../graphql/cache'
import { useEffect, useState } from 'react'
import CourseItemView from '../components/courses/CourseView/CourseItemView'
import useGetCurrentUser from '../hooks/users/useGetCurrentUser'
import Button from '../components/common/Button'
import PrevNextButtons from '../components/courses/CourseView/PrevNextButtons'
import CourseCompleted from '../components/courses/CourseView/CourseCompleted'
import useGetUserCourse from '../hooks/users/useGetUserCourse'

const CoursePage = () => {
  /*
    Our useRouter is a modified version of nextJS's useRouter, as router.query is only available in SSR applications.
    See: https://stackoverflow.com/a/56695180/4274008, https://github.com/vercel/next.js/issues/4804
  */
  const router = useRouter()
  const { id, cid: contentId, showEdit=false } = router.query

  const { user } = useGetCurrentUser();
  const { courseEdge } = useGetUserCourse(id)
  const [courseScore, setCourseScore] = useState(null)
  const [showCompletedPage, setShowCompletedPage] = useState(false)



  useEffect(() => {
    console.log('courseEdge')
    console.log(id, courseEdge)
  },[id, courseEdge])
  
  useEffect(() => {
    const view = {
      isSlimNav: true,
      showSecondary: false,
      ...viewVar()
    }
    viewVar(view)
    return () => {
      const view = viewVar()
      delete view.isSlimNav
      delete view.showSecondary
      const newView = { ...view }
      viewVar(newView)
    }
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

  useEffect(() => {
    setShowCompletedPage(false)
    if(courseEdge) {
      if(courseScore!==null && courseEdge?.score === 100) {
        // setShowCompletedPage(true)
      }
      courseEdge?.score && setCourseScore(courseEdge.score)
    }
  },[courseEdge, id])
  // usePageTitle({ title: `Course${course?.title ? `: ${course?.title}` : ''}`})

  useEffect(() => {
    headerButtonsVar(
      <>
        {showEdit && <Button onClick={editCourse}>Edit Course</Button> }
        { user && <PrevNextButtons /> }
      </>
    )
  },[showEdit, user])
  
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