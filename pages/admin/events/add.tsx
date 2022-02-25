import usePageTitle from '../../../hooks/usePageTitle'
import CreateEventForm from '../../../components/events/CreateEventForm'

const AddEventPage = () => {

  usePageTitle({ title: 'Add New Live Session' })

  return (
    <>
      <CreateEventForm />
    </>
  )
}

AddEventPage.navState = {
topLevel: 'events',
secondary: 'add'
}

export default AddEventPage