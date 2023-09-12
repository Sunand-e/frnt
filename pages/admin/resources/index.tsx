import { useRouter } from 'next/router'
import { Notices } from '../../../components/common/Notices'
import ResourcesTable from '../../../components/resources/ResourcesTable'
import usePageTitle from '../../../hooks/usePageTitle'
import useHeaderButtons from "../../../hooks/useHeaderButtons";
import ButtonAdd from '../../../components/common/ButtonAdd'

const AdminResources = () => {

  usePageTitle({
    title: 'Resource Library'
  })
  useHeaderButtons({
    id: 'createResource',
    component: <ButtonAdd action='/admin/resources/create' text='Create new resource' />
  })

  return (
    <>
      <Notices />
      <ResourcesTable />
    </>
  )
}

AdminResources.navState = {
  topLevel: 'resources',
  secondary: 'overview'
}

export default AdminResources
