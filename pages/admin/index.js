import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PageTitle from '../../components/PageTitle';

const AdminDashboard = () => {

  return (
    <PageTitle title="Admin Dashboard" />
  )
}

AdminDashboard.navState = {
  topLevel: 'dashboard',
}

export default AdminDashboard