import { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { TenantContext } from '../../../context/TenantContext';
import useGetGroup from '../../../hooks/groups/useGetGroup';
import { disableSubmitOnEnterKey } from '../../../utils/forms';
import { useRouter } from '../../../utils/router';
import Button from '../../common/Button';
import TextInput from '../../common/inputs/TextInput';
import CoursesDualListBoxInput from '../inputs/CoursesDualListBoxInput';
import GroupUsersInput from '../inputs/GroupUsersInput';
import OrganisationCourses from './OrganisationCourses';
import OrganisationMembers from './OrganisationMembers';

interface GroupFormValues {
  id?: string
  name: string 
  email: string
  groupImage: string
  userRole: string
  isOrganisation: boolean
  provisionedCourseIds: [any]
  provisionedResourceIds: [any]
  provisionedPathwayIds: [any]
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
        provisionedCourseIds: group?.provisionedCourses.edges.map(edge => edge.node.id) || [],
        provisionedResourceIds: group?.provisionedResources.edges.map(edge => edge.node.id) || [],
        provisionedPathwayIds: group?.provisionedPathways.edges.map(edge => edge.node.id) || [],
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
      provisionedContentIds: [
        ...values.provisionedCourseIds,
        ...values.provisionedResourceIds,
        ...values.provisionedPathwayIds
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

      {/* <GroupUsersInput control={control} label={'Members'} /> */}
      <OrganisationMembers />
      <OrganisationCourses />
      {/* <CoursesDualListBoxInput control={control} name={'provisionedCourseIds'} /> */}

      <Button type="submit">{buttonText}</Button>
    </form>
  )
}



export default OrganisationForm