import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PageTitle from '../../../components/PageTitle';

const AdminMarketing = () => {

  return (
    <PageTitle title="Title" />
  )
}

AdminMarketing.navState = {
topLevel: 'marketing',
secondary: 'overview'
}

export default AdminMarketing