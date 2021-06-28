import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PageTitle from '../../../components/PageTitle';

const AdminLibrary = () => {

  return (
    <PageTitle title="Content Library" />
  )
}

AdminLibrary.navState = {
topLevel: 'library',
secondary: 'overview'
}

export default AdminLibrary