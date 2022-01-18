import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import usePageTitle from '../../../hooks/usePageTitle'

const AdminLibraryAdd = () => {

  usePageTitle({ title: 'Add New Library Item' })

  return (
    <></>
  )
}

AdminLibraryAdd.navState = {
topLevel: 'library',
secondary: 'add'
}

export default AdminLibraryAdd