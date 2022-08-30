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
import courses from '../../../elp-courses';

interface UpdateGroupFormValues {
  name: string 
  email: string
  groupImage: string
  userRole: string
}

const GroupForm = ({group}) => {

  const users = group.users.edges.map(edge => edge.node)
  const { register, watch, handleSubmit, control, setFocus } = useForm<UpdateGroupFormValues>(
    {
      defaultValues: {
        ...group,
        userIds: users.map(user => user.id),
        enrolledCourseIds: group.enrolledCourses.edges.map(edge => edge.node.id) || [],
        assignedCourseIds: group.assignedCourses.map(course => course.id) || [],
      }
    }
  );

  useEffect(() => {
    setFocus('name')
  },[])

  const router = useRouter()

  const { updateGroup } = useUpdateGroup(group.id);

  const onSubmit = useCallback(values => {
    group && updateGroup(values)
    router.push('/admin/users/groups')
  },[group])

  const buttonText = group ? 'Save changes' : 'Create group'
  
  const vals = watch()
  return (
    <form
      className='h-full w-full max-w-md flex flex-col space-y-4'
      onSubmit={handleSubmit(onSubmit)}
    >
      <pre>
      { JSON.stringify(vals,null,2) }
      </pre>
      <TextInput
        label="Group name"
        placeholder="Group name"
        inputAttrs={register("name", { maxLength: 20 })}
      />
      <ImageSelectInput
        label="Group image"
        // placeholder={'https://picsum.photos/640/360'}
        isButtonAlwaysVisible={false}
        buttonText="Choose group image"
        control={control}
        origImage={group?.image}
        name="imageId"
        // inputAttrs={register("image", { required: true })}
      />

      <GroupUsersInput control={control} />
      <AssignedCoursesInput control={control} />
      <EnrolledCoursesInput control={control} />

      <Button type="submit">{buttonText}</Button>
    </form>
  )
}

export default GroupForm