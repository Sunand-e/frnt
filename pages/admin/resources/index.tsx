import { useRouter } from 'next/router'
import Button from '../../../components/common/Button'
import { Notices } from '../../../components/common/Notices'
import { headerButtonsVar, viewVar } from '../../../graphql/cache'
import ResourcesTable from '../../../components/resources/ResourcesTable'
import { useContext, useEffect } from 'react'
import usePageTitle from '../../../hooks/usePageTitle'
import ResourceFilters from '../../../components/resources/ResourceFilters'
import {Add} from "@styled-icons/fluentui-system-filled/Add";
import useHeaderButtons from "../../../hooks/useHeaderButtons";

const AddButton = () => (
  <>
    <span className='hidden lg:block'>Create new resource</span>
    <span className='block lg:hidden'><Add width="20" /></span>
  </>
)

const AdminResources = () => {

  usePageTitle({
    title: 'Resource Library'
  })

  useHeaderButtons([
    [<AddButton />, '/admin/resources/create']
  ])

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
