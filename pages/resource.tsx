import { useRouter } from '../utils/router'
import { headerButtonsVar } from '../graphql/cache'
import { useEffect } from 'react'
import Button from '../components/Button'
import ResourceView from '../components/ContentLibrary/ResourceView'

const ResourcePage = () => {
  /*
    Our useRouter is a modified version of nextJS's useRouter, as router.query is only available in SSR applications.
    See: https://stackoverflow.com/a/56695180/4274008, https://github.com/vercel/next.js/issues/4804
  */
  const router = useRouter()
  const { id, showEdit=false } = router.query

  const editItem = () => {
    router.push({
      pathname: `/admin/resources/edit`,
      query: {
        id
      }
    })
  }

  useEffect(() => {

    headerButtonsVar(
      <>
        {showEdit && <Button onClick={editItem}>Edit Item</Button> }
      </>
    )
  },[showEdit])
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