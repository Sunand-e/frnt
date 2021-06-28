import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PageTitle from '../../../components/PageTitle';

const AdminLibraryAdd = () => {

  return (
    <PageTitle title="Add New Library Item" />
  )
}

AdminLibraryAdd.navState = {
topLevel: 'library',
secondary: 'add'
}

export default AdminLibraryAdd