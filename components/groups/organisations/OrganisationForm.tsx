import useGetGroup from '../../../hooks/groups/useGetGroup';
import useUpdateGroup from '../../../hooks/groups/useUpdateGroup';
import { useRouter } from '../../../utils/router';
import Button from '../../common/Button';
import { useForm } from 'react-hook-form';
import TextInput from '../../common/inputs/TextInput';
import GroupUsersInput from '../inputs/GroupUsersInput';
import { useContext, useEffect } from 'react';
import AssignedResourcesInput from '../inputs/AssignedResourcesInput';
import AssignedPathwaysInput from '../inputs/AssignedPathwaysInput';
import AssignedCoursesInput from '../inputs/AssignedCoursesInput';
import { disableSubmitOnEnterKey } from '../../../utils/forms';
import { TenantContext } from '../../../context/TenantContext';
import CheckboxInput from '../../common/inputs/CheckboxInput';
import useCreateGroup from '../../../hooks/groups/useCreateGroup';
import OrganisationCourses from './OrganisationCourses';

interface GroupFormValues {
  id?: string
  name: string 
  email: string
  groupImage: string
  userRole: string
  isOrganisation: boolean
  availableCourseIds: [any]
  availableResourceIds: [any]
  availablePathwayIds: [any]
}

const OrganisationForm = ({organisation=null, onSubmit}) => {

  const router = useRouter()
  const { id } = router.query

  const { group } = useGetGroup(id)

  const tenant = useContext(TenantContext)

  const users = group?.users.edges.map(edge => edge.node) || []
  
  const { register, watch, handleSubmit: rhfHandleSubmit, control, setFocus } = useForm<GroupFormValues>(
    {
      defaultValues: {
        ...group,
        userIds: users.map(user => user.id),
        availableCourseIds: group?.availableCourses.edges.map(edge => edge.node.id) || [],
        availableResourceIds: group?.availableResources.edges.map(edge => edge.node.id) || [],
        availablePathwayIds: group?.availablePathways.edges.map(edge => edge.node.id) || [],
      }
    }
  );
  
  useEffect(() => {
    setFocus('name')
  },[])

  const handleSubmit = values => {
    const input = {
      ...values,
      ...(organisation === null ? { isOrganisation: true } : {}),
      availableContentIds: [
        ...values.availableCourseIds,
        ...values.availableResourceIds,
        ...values.availablePathwayIds
      ]
    }
    onSubmit(input)

    router.push('/admin/users/organisations')
  }

  const buttonText = group ? 'Save changes' : 'Create organisation'
  
  return (
    <form
      className='h-full w-full max-w-3xl flex flex-col space-y-4'
      onSubmit={rhfHandleSubmit(handleSubmit)}
      onKeyDown={disableSubmitOnEnterKey}
    >
      <TextInput
        label="Organisation name"
        placeholder="Organisation name"
        inputAttrs={register("name", { maxLength: 100 })}
      />
      
      {/* <UserSelect /> */}

      <GroupUsersInput control={control} label={'Members'} />

      <OrganisationCourses />
      <AssignedCoursesInput control={control} name={'availableCourseIds'} />

      <Button type="submit">{buttonText}</Button>
    </form>
  )
}



export default OrganisationForm