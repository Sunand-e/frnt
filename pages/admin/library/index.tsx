import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import usePageTitle from '../../../hooks/usePageTitle'
import Table from '../../../components/Table'
const AdminLibrary = () => {

  usePageTitle({ title: 'Content Library' })

  return (
    <>
    </>
  )
}

AdminLibrary.navState = {
topLevel: 'library',
secondary: 'overview'
}

export default AdminLibrary