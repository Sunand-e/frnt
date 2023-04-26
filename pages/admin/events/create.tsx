import usePageTitle from '../../../hooks/usePageTitle'
import EventForm from '../../../components/events/EventForm'
import useHeaderButtons from '../../../hooks/useHeaderButtons'
import EventTypeSelector from '../../../components/events/EventTypeSelector'
import { useState } from 'react'
import useCreateEvent from '../../../hooks/events/useCreateEvent'
import {ArrowBack} from "@styled-icons/boxicons-regular/ArrowBack";
import dayjs from 'dayjs'
import Button from '../../../components/common/Button'
import { useRouter } from '../../../utils/router'
import ButtonBack from '../../../components/common/ButtonBack'

const CreateEventPage = () => {

  usePageTitle({ title: 'Create New Event' })
  
  useHeaderButtons({
    id: 'backToEvents',
    component: <ButtonBack text='Back to events list' action='/admin/events' />,
  })

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
