import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PageTitle from '../../../components/PageTitle';

const AdminCommunity = () => {

  return (
    <PageTitle title="Community" />
  )
}

AdminCommunity.navState = {
topLevel: 'community',
secondary: 'community'
}

export default AdminCommunity