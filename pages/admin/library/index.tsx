import { useRouter } from 'next/router'
import Button from '../../../components/Button'
import { Notices } from '../../../components/Notices'
import { headerButtonsVar, viewVar } from '../../../graphql/cache'
import ResourcesTable from '../../../components/admin/resources/ResourcesTable/ResourcesTable'
import { useContext, useEffect } from 'react'
import { ModalContext } from '../../../context/modalContext'
import usePageTitle from '../../../hooks/usePageTitle'
import ResourceFilters from '../../../components/admin/resources/ResourceFilters'
import {Add} from "@styled-icons/fluentui-system-filled/Add";
import useHeaderButtons from "../../../hooks/useHeaderButtons";

const AddButton = () => (
  <>
    <span className='hidden lg:block'>Add new library item</span>
    <span className='block lg:hidden'><Add  width="20" /></span>
  </>
)

const AdminLibraryItems = () => {

  usePageTitle({
    title: 'Resource Library'
  })

  const router = useRouter()
  
  const { handleModal, closeModal } = useContext(ModalContext);


  useHeaderButtons([
    [<AddButton />, '/admin/library/create']
  ])

  return (
    <>
      <Notices />
      <ResourceFilters />
      <ResourcesTable />
    </>
  )
}



AdminResources.navState = {
  topLevel: 'library',
  secondary: 'library'
}

export default AdminResources
