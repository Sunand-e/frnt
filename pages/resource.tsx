import { useRouter } from '../utils/router'
import Button from '../components/common/Button'
import ResourceView from '../components/resources/ResourceView'
import useHeaderButtons from '../hooks/useHeaderButtons'

const ResourcePage = () => {
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