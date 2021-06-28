import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PageTitle from '../../../components/PageTitle';

const AdminEvents = () => {

  return (
    <PageTitle title="Live Sessions" />
  )
}

AdminEvents.navState = {
topLevel: 'events',
secondary: 'overview'
}

export default AdminEvents