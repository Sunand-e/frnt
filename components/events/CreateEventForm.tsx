import Button from '../Button';
import useCreateEvent from '../../hooks/events/useCreateEvent';
import { useForm } from 'react-hook-form';
import ImageSelectInput from '../common/inputs/ImageSelectInput';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import TextInput from '../common/inputs/TextInput';

interface CreateEventFormValues {
  name: string 
  email: string
  eventImage: string
  userRole: string
}

const CreateEventForm = () => {

  const { register, handleSubmit, control, setFocus, formState: { errors } } = useForm<CreateEventFormValues>();

  useEffect(() => {
    setFocus('name')
  },[])

  const router = useRouter()
  
  const { createEvent } = useCreateEvent();

  const onSubmit = values => {
    createEvent(values)
    router.push('/admin/events')
  }

  return (
    <form
      className='h-full w-full max-w-lg flex flex-col space-y-4'
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextInput
        label="Event name"
        placeholder="Event name"
        inputAttrs={register("name", {
          required: "Evwnr name is required",
          maxLength: 20
        })}
      />
      {errors.name && (<small className="text-danger text-rose-800">{errors.name.message}</small>)}

      <ImageSelectInput
        label="Event image"
        placeholder={'https://picsum.photos/640/360'}
        buttonText="Choose event image"
        control={control}
        name="eventImage"
        // inputAttrs={register("image", { required: true })}
      />

      {/* <EventUsersInput control={control} /> */}

      <Button type="submit">Create event</Button>
    </form>
  )
}

export default CreateEventForm
