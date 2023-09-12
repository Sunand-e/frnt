import { useRouter } from '../utils/router'
import { headerButtonsVar } from '../graphql/cache'
import { useEffect } from 'react'
import Button from '../components/common/Button'
import ResourceView from '../components/resources/ResourceView'
import useHeaderButtons from '../hooks/useHeaderButtons'

const ResourcePage = () => {
  /*
    Our useRouter is a modified version of nextJS's useRouter, as router.query is only available in SSR applications.
    See: https://stackoverflow.com/a/56695180/4274008, https://github.com/vercel/next.js/issues/4804
  */
  const router = useRouter()
  const { id, showEdit } = router.query

  const editItem = () => {
    router.push({
      pathname: `/admin/resources/edit`,
      query: {
        id
      }
    })
  }

  const headerButton = showEdit && {
    id: 'saveResource',
    component: <Button onClick={editItem}>Edit resource</Button>
  }

  useHeaderButtons(headerButton)

  return (
    <>
    <ResourceView id={id} />
    </>
  )
}

ResourcePage.navState = {
  topLevel: 'library',
  secondary: 'overview'
}
export default ResourcePage