import usePageTitle from '../../../hooks/usePageTitle'
import CreateEventForm from '../../../components/events/CreateEventForm'

const AddEventPage = () => {

  usePageTitle({ title: 'Add New Event' })

  return (
    <>
      <CreateEventForm />
    </>
  )
}

AddEventPage.navState = {
topLevel: 'events',
secondary: 'virtual'
}

export default AddEventPage
