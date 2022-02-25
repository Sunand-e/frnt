import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import usePageTitle from '../../../hooks/usePageTitle'
import EventsListTable from '../../../components/events/EventsListTable'
import useHeaderButtons from '../../../hooks/useHeaderButtons'

const AdminEvents = () => {

  usePageTitle({ title: 'Live Sessions' })
  useHeaderButtons([
    ['Add live session', '/admin/events/add'],
  ])
  return (
    <EventsListTable />
  )
}

AdminEvents.navState = {
topLevel: 'events',
secondary: 'overview'
}

export default AdminEvents