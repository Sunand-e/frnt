import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import usePageTitle from '../../hooks/usePageTitle';

const AdminDashboard = () => {
  
  usePageTitle({ title: 'Admin Dashboard' })

  return (
    <>
    </>
  )
}

AdminDashboard.navState = {
  topLevel: 'dashboard',
}

export default AdminDashboard