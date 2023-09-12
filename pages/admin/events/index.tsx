import usePageTitle from '../../../hooks/usePageTitle'
import EventsListTable from '../../../components/events/EventsListTable'
import useHeaderButtons from '../../../hooks/useHeaderButtons'
import EventFilters from "../../../components/events/EventFilters";
import ButtonAdd from '../../../components/common/ButtonAdd'

const AdminEvents = () => {

  usePageTitle({ title: 'All Events' })
  useHeaderButtons({
    id: 'createEvent',
    component: <ButtonAdd action='/admin/events/create' text='Create new event' />
  })
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
