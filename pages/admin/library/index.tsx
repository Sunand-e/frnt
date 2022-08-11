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
import LibraryFilters from '../../../components/admin/libraryItems/LibraryFilters'
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
      <LibraryFilters />
      <LibraryItemsTable />
    </>
  )
}



AdminLibraryItems.navState = {
  topLevel: 'library',
  secondary: 'library'
}

export default AdminLibraryItems
