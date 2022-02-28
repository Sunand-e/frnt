import Button from '../../Button';
import { useForm } from 'react-hook-form';
import ImageSelectInput from '../../common/inputs/ImageSelectInput';
import TextInput from '../../common/inputs/TextInput';
import AssignedCoursesInput from './inputs/AssignedCoursesInput';
import GroupUsersInput from './inputs/GroupUsersInput';
import { useRouter } from 'next/router';
import EnrolledCoursesInput from './inputs/EnrolledCoursesInput';
import { useCallback, useEffect, useState } from 'react';
import useUpdateGroup from '../../../hooks/groups/useUpdateGroup';

interface UpdateGroupFormValues {
  name: string 
  email: string
  groupImage: string
  userRole: string
}

const GroupForm = ({group}) => {

  const { register, handleSubmit, control, setFocus } = useForm<UpdateGroupFormValues>(
    {
      defaultValues: {
        userIds: group.users.map(user => user.id),
        enrolledCourseIds: group.enrolledCourses.map(course => course.id),
        assignedCourseIds: group.assignedCourses.map(course => course.id),
        ...group
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

      <Button type="submit">{group ? 'Save changes' : 'Create group'} </Button>
    </form>
  )
}

export default GroupForm