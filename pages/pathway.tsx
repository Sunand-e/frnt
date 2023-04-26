import usePageTitle from '../hooks/usePageTitle'
import { useRouter } from '../utils/router'
import { useEffect } from 'react'
import CourseItemView from '../components/courses/CourseView/CourseItemView'
import useGetCurrentUser from '../hooks/users/useGetCurrentUser'
import Button from '../components/common/Button'
import useGetPathway from '../hooks/pathways/useGetPathway'
import PathwayTimeline from '../components/pathways/PathwayTimeline'
import { useViewStore, resetViewStore } from '../hooks/useViewStore'

const PathwayPage = () => {
  /*
    Our useRouter is a modified version of nextJS's useRouter, as router.query is only available in SSR applications.
    See: https://stackoverflow.com/a/56695180/4274008, https://github.com/vercel/next.js/issues/4804
  */
  const router = useRouter()
  const { pid } = router.query

  const { user } = useGetCurrentUser()
  const { loading, error, pathway } = useGetPathway(pid)

  usePageTitle({ title: pathway?.title ? `Pathway: ${pathway.title}` : 'Pathway' })

  useEffect(() => {
    useViewStore.setState({
      isSlimNav: true,
      showSecondaryNav: true,
    })
    return resetViewStore()
  },[])

  return (
    <>
      { user &&  <PathwayTimeline /> }
    </>
  )
}

PathwayPage.navState = {
  topLevel: 'pathways',
  // secondary: 'pathways'
}

export default PathwayPage