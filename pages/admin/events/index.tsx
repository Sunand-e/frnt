import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import usePageTitle from '../../../hooks/usePageTitle'
import EventsListTable from '../../../components/events/EventsListTable'
import useHeaderButtons from '../../../hooks/useHeaderButtons'
import EventFilters from "../../../components/admin/events/EventFilters";

const AdminEvents = () => {

  usePageTitle({ title: 'All Events' })
  useHeaderButtons([
    ['Add new event', '/admin/events/selectEventType'],
  ])
  return (
    <>
      <EventFilters />
      <EventsListTable />
    </>
  )
}

AdminEvents.navState = {
topLevel: 'events',
secondary: 'overview'
}

export default AdminEvents
