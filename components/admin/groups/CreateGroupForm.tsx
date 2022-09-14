import Button from '../../Button';
import useCreateGroup from '../../../hooks/groups/useCreateGroup';
import { useForm } from 'react-hook-form';
import ImageSelectInput from '../../common/inputs/ImageSelectInput';
import TextInput from '../../common/inputs/TextInput';
import AssignedCoursesInput from './inputs/AssignedCoursesInput';
import GroupUsersInput from './inputs/GroupUsersInput';
import { Router, useRouter } from 'next/router';
import EnrolledCoursesInput from './inputs/EnrolledCoursesInput';
import React from "react";

interface CreateGroupFormValues {
  name: string 
  email: string
  groupImage: string
  userRole: string
}

const CreateGroupForm = () => {

  const { register, handleSubmit, control, formState: { errors } } = useForm<CreateGroupFormValues>();

  const router = useRouter()
  
  const { createGroup } = useCreateGroup();

  const onSubmit = values => {
    createGroup(values)
    router.push('/admin/users/groups')
  }

  return (
    <form
      className='h-full w-full max-w-md flex flex-col space-y-4'
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextInput
        label="Group name"
        placeholder="Group name"
        inputAttrs={register("name", {
          required: "Group name is required"
        })}
      />
      {errors.name && (<small className="text-danger text-red-500">{errors.name.message}</small>)}

      {/* <ImageSelectInput
        label="Group image"
        // placeholder={'https://picsum.photos/640/360'}
        isButtonAlwaysVisible={false}
        buttonText="Choose group image"
        control={control}
        name="imageId"
        // inputAttrs={register("image", { required: true })}
      /> */}

      <GroupUsersInput control={control} />
      {/* <AssignedCoursesInput control={control} /> */}
      <EnrolledCoursesInput control={control} />

      <Button type="submit">Create group</Button>
    </form>
  )
}

export default CreateGroupForm
