import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import usePageTitle from '../../../hooks/usePageTitle'
import EventsListTable from '../../../components/events/EventsListTable'

const AdminEvents = () => {

  usePageTitle({ title: 'Live Sessions' })
  return (
    <EventsListTable />
  )
}

AdminEvents.navState = {
topLevel: 'events',
secondary: 'overview'
}

export default AdminEvents