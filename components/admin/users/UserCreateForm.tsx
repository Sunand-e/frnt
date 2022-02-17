import { useMutation } from '@apollo/client';
import { Form, Formik } from "formik"
import * as Yup from 'yup'
import React from 'react';
// import { CREATE_USER } from '../../../graphql/mutations/allMutations';
import Button from '../../Button';
import ImageSelectInput from '../../common/inputs/ImageSelectInput';
import SelectInput from '../../common/inputs/SelectInput';
import TextInput from '../../common/inputs/TextInput';
import { useForm } from 'react-hook-form';

interface NewUserFormValues {
  firstName: string
  lastName: string
  email: string
  userImage: string
  userRole: string
}

const NewUserForm = () => {
  
  const { register, handleSubmit, control } = useForm<NewUserFormValues>();

  const onSubmit = values => {
    alert(JSON.stringify(values, null, 2))
  }

  return (
    <form
      className='h-full w-full max-w-sm flex flex-col space-y-4'
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextInput
        label="First name"
        placeholder="First name"
        inputAttrs={register("firstName", { maxLength: 20 })}
      />
      <TextInput
        label="Last name"
        placeholder="Last name"
        inputAttrs={register("lastName", { maxLength: 20 })}
      />
      <ImageSelectInput
        placeholder={'https://picsum.photos/640/360'}
        buttonText="Choose profile image"
        control={control}
        name="userImage"
        // inputAttrs={register("image", { required: true })}
      />
      <SelectInput
        label="User role"
        options={["Employee", "External", "Manager"]}
        inputAttrs={register("userRole")}
      />

      <Button type="submit">Submit</Button>
    </form>
  );
}

export default NewUserForm