import { useReactiveVar } from '@apollo/client'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Button from '../../../components/Button'
import { Notices } from '../../../components/Notices'
import { headerButtonsVar, viewVar } from '../../../graphql/cache'
import LibraryItemsTable from '../../../components/admin/libraryItems/LibraryItemsTable/LibraryItemsTable'
import { useContext, useEffect } from 'react'
import { ModalContext } from '../../../context/modalContext'
import usePageTitle from '../../../hooks/usePageTitle'
const AdminLibraryItems = () => {

  usePageTitle({
    title: 'LibraryItems'
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
      <LibraryItemsTable />
    </>
  )
}



AdminLibraryItems.navState = {
  topLevel: 'library',
  secondary: 'library'
}

export default AdminLibraryItems