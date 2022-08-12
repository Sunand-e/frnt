import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import usePageTitle from '../../../hooks/usePageTitle'
import EventsListTable from '../../../components/events/EventsListTable'
import useHeaderButtons from '../../../hooks/useHeaderButtons'
import EventFilters from "../../../components/admin/events/EventFilters";
import {Add} from "@styled-icons/fluentui-system-filled/Add";


const AddButton = () => (
  <>
    <span className='hidden lg:block'>Create new event</span>
    <span className='block lg:hidden'><Add  width="20" /></span>
  </>
)

  const AdminEvents = () => {

  usePageTitle({ title: 'All Events' })
  useHeaderButtons([
    [<AddButton />, '/admin/events/create'],
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
