import usePageTitle from '../../../hooks/usePageTitle'
import EventForm from '../../../components/events/EventForm'
import useHeaderButtons from '../../../hooks/useHeaderButtons'
import EventTypeSelector from '../../../components/events/EventTypeSelector'
import { useState } from 'react'
import useCreateEvent from '../../../hooks/events/useCreateEvent'
import {ArrowBack} from "@styled-icons/boxicons-regular/ArrowBack";
import dayjs from 'dayjs'

const BackButton = () => (
  <>
    <span className='hidden lg:block'>Back to events list</span>
    <span className='block lg:hidden'><ArrowBack  width="20" /></span>
  </>
)

const CreateEventPage = () => {

  usePageTitle({ title: 'Create New Event' })
  
  useHeaderButtons([
    [<BackButton />,'/admin/events']
  ])

  const { createEvent } = useCreateEvent()

  const [eventModelType, setEventModelType] = useState(null)

  const handleSubmit = (values) => {
    createEvent(values)
  }

  return (
    <>
      { eventModelType ? (
        <EventForm type={eventModelType} onSubmit={handleSubmit} />
      ) : (
        <EventTypeSelector onSelect={setEventModelType} />
      )}
    </>
  )
}

CreateEventPage.navState = {
topLevel: 'events',
secondary: 'virtual'
}

export default CreateEventPage
