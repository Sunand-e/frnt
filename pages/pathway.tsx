import usePageTitle from '../hooks/usePageTitle'
import { useRouter } from '../utils/router'
import { useQuery, useReactiveVar } from '@apollo/client'
import { GET_COURSE } from "../graphql/queries/allQueries"
import CourseLayout from '../layouts/CourseLayout'
import { currentContentItemVar, headerButtonsVar, viewVar } from '../graphql/cache'
import { useState, useEffect } from 'react'
import CourseItemView from '../components/CourseView/CourseItemView'
import useUpdateUserContentStatus from '../hooks/users/useUpdateUserContentStatus'
import useGetCourse from '../hooks/courses/useGetCourse'
import useGetUser from '../hooks/users/useGetUser'
import Button from '../components/Button'

const CoursePage = () => {
  /*
    Our useRouter is a modified version of nextJS's useRouter, as router.query is only available in SSR applications.
    See: https://stackoverflow.com/a/56695180/4274008, https://github.com/vercel/next.js/issues/4804
  */
  const router = useRouter()
  const { id, cid: contentId, showEdit=false } = router.query

  const { loading, error, course } = useGetCourse(id);
  const { user } = useGetUser();

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
    currentContentItemVar({
      ...currentContentItem,
      id: contentId
    })

    if(contentId) {
      updateUserContentStatus({
        contentItemId: contentId,
        completed: true,
        score: 20,
        status: 'In progress'
      })
    } else {
      updateUserContentStatus({
        contentItemId: id,
        score: 20,
        status: 'In progress'
      })
    }
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
    user && console.log('user',user)
    headerButtonsVar(
      <>
        {showEdit && <Button onClick={editCourse}>Edit Course</Button> }
      </>
    )
  },[showEdit])
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