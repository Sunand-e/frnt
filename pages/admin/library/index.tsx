import { useRouter } from 'next/router'
import Button from '../../../components/Button'
import { Notices } from '../../../components/Notices'
import { headerButtonsVar, viewVar } from '../../../graphql/cache'
import ResourcesTable from '../../../components/admin/resources/ResourcesTable/ResourcesTable'
import { useContext, useEffect } from 'react'
import { ModalContext } from '../../../context/modalContext'
import usePageTitle from '../../../hooks/usePageTitle'
import LibraryFilters from '../../../components/admin/resources/ResourceFilters'
const AdminResources = () => {

  usePageTitle({
    title: 'Resource Library'
  })

  const router = useRouter()
  
  const { handleModal, closeModal } = useContext(ModalContext);

  const handleAddClick = (e) => {
    router.push('/admin/library/create')
  }
  
  useEffect(() => {
    headerButtonsVar(
      <>
        <Button onClick={handleAddClick}>Add new library item</Button>
      </>
    )
  },[])

  return (
    <>
      <Notices />
      <LibraryFilters />
      <ResourcesTable />
    </>
  )
}



AdminResources.navState = {
  topLevel: 'library',
  secondary: 'library'
}

export default AdminResources