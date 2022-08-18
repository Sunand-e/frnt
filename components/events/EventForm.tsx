import Button from '../Button';
import useCreateEvent from '../../hooks/events/useCreateEvent';
import { useForm } from 'react-hook-form';
import ImageSelectInput from '../common/inputs/ImageSelectInput';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import TextInput from '../common/inputs/TextInput';
import { CREATE_EVENT } from '../../graphql/mutations/event/CREATE_EVENT';
import { useMutation } from '@apollo/client';
import DatePickerInput from '../common/inputs/DatePickerInput';
import dayjs from 'dayjs';
import CheckboxInput from '../common/inputs/CheckboxInput';

interface EventFormValues {
  title: string
  eventImage: string
  date: [Date]
}

const EventForm = ({event=null, type, onSubmit}) => {

  const defaultValues = {
    ...event,
    eventModelType: type?.eventModel,
    title: event?.title
  }

  const { watch, register, handleSubmit: rhfHandleSubmit, control, setFocus, formState: { errors } } = useForm<EventFormValues>({
    defaultValues
  });

  useEffect(() => {
    setFocus('title')
  },[])

  const router = useRouter()

  const handleSubmit = values => {
    const newValues = {
      ...values,
      startTime: values.dateRange[0],
      duration: dayjs(values.dateRange[0]).diff(values.dateRange[1])
    }

    onSubmit(newValues)
    router.push('/admin/events')
  }

  const formVals = watch()
  return (
    <form
      className='h-full w-full max-w-lg flex flex-col space-y-4'
      onSubmit={rhfHandleSubmit(handleSubmit)}
    >
      <TextInput
        label="Event name"
        placeholder="Event name"
        inputAttrs={register("title", {
          required: "Event name is required",
          maxLength: 20
        })}
      />
      {errors.title && (<small className="text-danger text-rose-800">{errors.title.message}</small>)}

      <DatePickerInput
        isRangeAvailable={true}
        label={'Date'}
        name="date"
        control={control}
      />

      <Button type="submit">Create event</Button>
      <pre>
      { JSON.stringify(formVals,null,2) }
      </pre>
    </form>
    
  )
}

export default EventForm
