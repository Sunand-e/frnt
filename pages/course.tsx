import usePageTitle from '../hooks/usePageTitle'
import { useRouter } from '../utils/router'
import { useQuery, useReactiveVar } from '@apollo/client'
import { GET_COURSE } from "../graphql/queries/allQueries"
import CourseLayout from '../layouts/CourseLayout'
import { currentContentItemVar, headerButtonsVar, viewVar } from '../graphql/cache'
import { useState, useEffect } from 'react'
import CourseItemView from '../components/CourseView/CourseItemView'
import useUpdateUserContentStatus from '../hooks/users/useUpdateUserContentStatus'

const CoursePage = () => {
  /*
    Our useRouter is a modified version of nextJS's useRouter, as router.query is only available in SSR applications.
    See: https://stackoverflow.com/a/56695180/4274008, https://github.com/vercel/next.js/issues/4804
  */
  const router = useRouter()
  const { id, cid: contentId } = router.query

  const { loading, error, data: {course} = {} } = useQuery(
    GET_COURSE,
    {
      variables: {
        id
      }
    }
  );

  const { updateUserContentStatus } = useUpdateUserContentStatus()

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

  const currentContentItem = useReactiveVar(currentContentItemVar) 

  
  useEffect(() => {
    currentContentItemVar({
      ...currentContentItem,
      id: contentId
    })
    
    updateUserContentStatus({
      contentItemId: contentId,
      completed: true,
      score: 100,
      status: 'In progress'
    })
  },[id, contentId])

  useEffect(() => {
    // If there is a course but no item provided, show the first item
    if(course && !currentContentItem.id) {
      const firstItemInCourse = course?.sections.find(
        (section) => section.children?.length
      )?.children[0]

      if(firstItemInCourse) {
        currentContentItemVar({
          ...currentContentItem,
          id: firstItemInCourse.id
        })
      }
    }
  },[id, course?.id])

  usePageTitle({ title: `Course: ${course?.title}` })

  useEffect(() => {
    headerButtonsVar(
      <>
      </>
    )
  },[])
  return (
    <>
      { currentContentItem.id && (
        <CourseItemView id={currentContentItem.id} />
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