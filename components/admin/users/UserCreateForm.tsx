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
import axios from 'axios';
import { useRouter } from 'next/router';
import useGetUsers from '../../../hooks/users/useGetUsers';

interface UserCreateFormValues {
  first_name: string
  last_name: string
  email: string
  userImage: string
  userRole: string
}

const UserCreateForm = () => {
  
  const router = useRouter()
  const endpoint = "/api/v1/users/"
  const tenantId = 'fe09e324-2aad-413f-930f-7177caa5b7b8'
  const { refetchUsers } = useGetUsers()

  const { register, handleSubmit, control } = useForm<UserCreateFormValues>();

  const onSubmit = values => {
    
    const token = localStorage.getItem('token');
    
    const data = {
      user: {
        ...values,
        tenant_id: tenantId,
      // invite: true
    }}

    // alert(JSON.stringify(data, null, 2))

    axios.request({
      method: "post", 
      url: endpoint,
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      data
    }).then (data => {
      refetchUsers()
      router.push('/admin/users')
      // alert(JSON.stringify(data, null,2))      
    })
  }

  return (
    <form
      className='h-full w-full max-w-sm flex flex-col space-y-4'
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextInput
        label="First name"
        placeholder="First name"
        inputAttrs={register("first_name", { maxLength: 20 })}
      />
      <TextInput
        label="Last name"
        placeholder="Last name"
        inputAttrs={register("last_name", { maxLength: 20 })}
      />
      <TextInput
        label="email"
        placeholder="email"
        inputAttrs={register("email", { maxLength: 40 })}
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
        // inputAttrs={register("userRole")}
      />

      <Button type="submit">Submit</Button>
    </form>
  );
}

export default UserCreateForm