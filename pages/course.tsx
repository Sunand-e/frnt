import { useRouter } from '../utils/router'
import CourseLayout from '../layouts/CourseLayout'
import { headerButtonsVar, viewVar } from '../graphql/cache'
import { useEffect, useState } from 'react'
import CourseItemView from '../components/CourseView/CourseItemView'
import useGetCurrentUser from '../hooks/users/useGetCurrentUser'
import Button from '../components/Button'
import PrevNextButtons from '../components/CourseView/PrevNextButtons'
import CourseCompleted from '../components/CourseView/CourseCompleted'
import useGetUserContent from '../hooks/users/useGetUserContent'

const CoursePage = () => {
  /*
    Our useRouter is a modified version of nextJS's useRouter, as router.query is only available in SSR applications.
    See: https://stackoverflow.com/a/56695180/4274008, https://github.com/vercel/next.js/issues/4804
  */
  const router = useRouter()
  const { id, cid: contentId, showEdit=false } = router.query

  const { user } = useGetCurrentUser();
  const { user: userContent } = useGetUserContent(id)
  
  const [courseScore, setCourseScore] = useState(null)
  const [showCompletedPage, setShowCompletedPage] = useState(null)

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
    if(user) {
      setShowCompletedPage(false)
      let userContent = user.courses.edges.find(userContentEdge => userContentEdge.node.id === id)
      if(courseScore && userContent?.score === 100) {
        setShowCompletedPage(true)
      }
      userContent?.score && setCourseScore(userContent.score)
    }
  },[user, id])

  // usePageTitle({ title: `Course${course?.title ? `: ${course?.title}` : ''}`})

  useEffect(() => {
    user && console.log('user',user)
    headerButtonsVar(
      <>
        {showEdit && <Button onClick={editCourse}>Edit Course</Button> }
        <PrevNextButtons />
      </>
    )
  },[showEdit])
  
  return (
    <>
      {showCompletedPage ? (
        <CourseCompleted />
      ) : (
        <CourseItemView />        
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