import Button from '../common/Button';
import { useForm } from 'react-hook-form';
import TextInput from '../common/inputs/TextInput';
import GroupUsersInput from './inputs/GroupUsersInput';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import AssignedResourcesInput from './inputs/AssignedResourcesInput';
import AssignedPathwaysInput from './inputs/AssignedPathwaysInput';
import AssignedCoursesInput from './inputs/AssignedCoursesInput';
import { disableSubmitOnEnterKey } from '../../utils/forms';

interface GroupFormValues {
  id?: string
  name: string 
  email: string
  groupImage: string
  userRole: string
  assignedCourseIds: [any]
  assignedResourceIds: [any]
  assignedPathwayIds: [any]
}

const GroupForm = ({group=null, onSubmit}) => {

  const users = group?.users.edges.map(edge => edge.node) || []
  
  const { register, watch, handleSubmit: rhfHandleSubmit, control, setFocus } = useForm<GroupFormValues>(
    {
      defaultValues: {
        ...group,
        userIds: users.map(user => user.id),
        assignedCourseIds: group?.assignedCourses.edges.map(edge => edge.node.id) || [],
        assignedResourceIds: group?.assignedResources.edges.map(edge => edge.node.id) || [],
        assignedPathwayIds: group?.assignedPathways.edges.map(edge => edge.node.id) || [],
      }
    }
  );
  
  useEffect(() => {
    setFocus('name')
  },[])

  const handleSubmit = values => {
    const input = {
      ...values,
      assignedContentIds: [
        ...values.assignedCourseIds,
        ...values.assignedResourceIds,
        ...values.assignedPathwayIds
      ]
    }
    onSubmit(input)
  }

  const buttonText = group ? 'Save changes' : 'Create group'


  
  return (
    <form
      className='h-full w-full max-w-3xl flex flex-col space-y-4'
      onSubmit={rhfHandleSubmit(handleSubmit)}
      onKeyDown={disableSubmitOnEnterKey}
    >
      <TextInput
        label="Group name"
        placeholder="Group name"
        inputAttrs={register("name", { maxLength: 100 })}
      />
{/*       
      <ImageSelectInput
        label="Group image"
        // placeholder={'https://picsum.photos/640/360'}
        isButtonAlwaysVisible={false}
        buttonText="Choose group image"
        control={control}
        origImage={group?.image}
        name="imageId"
        // inputAttrs={register("image", { required: true })}
      /> */}

      <GroupUsersInput control={control} />
      <AssignedCoursesInput control={control} />
      <AssignedResourcesInput control={control} />
      <AssignedPathwaysInput control={control} />

      <Button type="submit">{buttonText}</Button>
    </form>
  )
}

export default GroupForm