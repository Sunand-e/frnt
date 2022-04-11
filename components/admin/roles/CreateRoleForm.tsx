import Button from '../../Button';
import { useForm } from 'react-hook-form';
import ImageSelectInput from '../../common/inputs/ImageSelectInput';
import TextInput from '../../common/inputs/TextInput';
import AssignedCoursesInput from './inputs/AssignedCoursesInput';
import GroupUsersInput from './inputs/GroupUsersInput';
import { useRouter } from 'next/router';
import EnrolledCoursesInput from './inputs/EnrolledCoursesInput';
import { useCallback, useEffect, useState } from 'react';
import useUpdateGroup from '../../../hooks/roles/useUpdateGroup';

interface RoleFormValues {
  name?: string 
  email: string
  groupImage: string
  userRole: string
}

const RoleForm = ({role}) => {

  const { register, handleSubmit, control, setFocus } = useForm<RoleFormValues>(
    {
      defaultValues: {
        ...role
      }
    }
  );

  const [ values, setValues ] = useState({})

  useEffect(() => {
    setFocus('name')
  },[])

  const router = useRouter()

  const { updateGroup } = useUpdateGroup(group.id);

  const onSubmit = useCallback(values => {
    group && updateGroup(values)
    setValues(values)
    router.push('/admin/users/groups')
  },[group])

  const buttonText = group ? 'Save changes' : 'Create group'
  
  return (
    <form
      className='h-full w-full max-w-lg flex flex-col space-y-4'
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextInput
        label="Group name"
        placeholder="Group name"
        inputAttrs={register("name", { maxLength: 20 })}
      />
      <ImageSelectInput
        label="Group image"
        placeholder={'https://picsum.photos/640/360'}
        buttonText="Choose group image"
        control={control}
        name="groupImage"
        // inputAttrs={register("image", { required: true })}
      />

      <GroupUsersInput control={control} />
      <AssignedCoursesInput control={control} />
      <EnrolledCoursesInput control={control} />

      <Button type="submit">{buttonText}</Button>
    </form>
  )
}

export default RoleForm