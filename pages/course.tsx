import usePageTitle from '../hooks/usePageTitle'
import { useRouter } from '../utils/router'
import { useReactiveVar } from '@apollo/client'
import CourseLayout from '../layouts/CourseLayout'
import { currentContentItemVar, headerButtonsVar, viewVar } from '../graphql/cache'
import { useEffect } from 'react'
import CourseItemView from '../components/CourseView/CourseItemView'
import useGetCourse from '../hooks/courses/useGetCourse'
import useGetUser from '../hooks/users/useGetUser'
import Button from '../components/Button'
import PrevNextButtons from '../components/CourseView/PrevNextButtons'
import CourseCompleted from '../components/CourseView/CourseCompleted'

const CoursePage = () => {
  /*
    Our useRouter is a modified version of nextJS's useRouter, as router.query is only available in SSR applications.
    See: https://stackoverflow.com/a/56695180/4274008, https://github.com/vercel/next.js/issues/4804
  */
  const router = useRouter()
  const { id, cid: contentId, showEdit=false, completed=false } = router.query

  const { course } = useGetCourse(id);
  const { user } = useGetUser();
  
  const currentContentItem = useReactiveVar(currentContentItemVar)

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
      let userContent = user.courses.edges.find(userContentEdge => userContentEdge.node.id === id)
      if(userContent?.score === 100) {
        router.push({
          query: {
            id,
            completed: true
          }
        })
      }
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
      {completed ? (
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