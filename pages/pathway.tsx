import usePageTitle from '../hooks/usePageTitle'
import { useRouter } from '../utils/router'
import { useReactiveVar } from '@apollo/client'
import CourseLayout from '../layouts/CourseLayout'
import { currentContentItemVar, headerButtonsVar, viewVar } from '../graphql/cache'
import { useEffect } from 'react'
import CourseItemView from '../components/courses/CourseView/CourseItemView'
import useGetCurrentUser from '../hooks/users/useGetCurrentUser'
import Button from '../components/common/Button'
import useGetPathway from '../hooks/pathways/useGetPathway'
import PathwayTimeline from '../components/pathways/PathwayTimeline'

const PathwayPage = () => {
  /*
    Our useRouter is a modified version of nextJS's useRouter, as router.query is only available in SSR applications.
    See: https://stackoverflow.com/a/56695180/4274008, https://github.com/vercel/next.js/issues/4804
  */
  const router = useRouter()
  const { pid } = router.query

  const { loading, error, pathway } = useGetPathway(pid);
  const { user } = useGetCurrentUser();

  useEffect(() => {
    const view = {
      isSlimNav: true,
      showSecondary: true,
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

  usePageTitle({ title: pathway?.title ? `Pathway: ${pathway.title}` : 'Pathway' })

  return (
    <>
      <PathwayTimeline />
    </>
  )
}

PathwayPage.navState = {
  topLevel: 'courses',
  secondary: 'pathways'
}

export default PathwayPage