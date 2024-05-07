import { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { TenantContext } from '../../../context/TenantContext';
import useGetGroup from '../../../hooks/groups/useGetGroup';
import { disableSubmitOnEnterKey } from '../../../utils/forms';
import { useRouter } from '../../../utils/router';
import Button from '../../common/Button';
import NumberPropertyInput from '../../common/inputs/NumberPropertyInput';
import TextInput from '../../common/inputs/TextInput';
import GroupMembers from '../GroupMembers';
import CoursesDualListBoxInput from '../inputs/CoursesDualListBoxInput';
import GroupUsersInput from '../inputs/GroupUsersInput';
import MenuTest from './MenuTest';
import OrganisationCourses from './OrganisationCourses';
import OrganisationLeader from './OrganisationLeader';
import OrganisationMembers from './OrganisationMembers';

interface GroupFormValues {
  id?: string
  name: string 
  email: string
  groupImage: string
  userRole: string
  isOrganisation: boolean
  enrolments: number
  enrolmentLicenseTotal: number
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
        enrolments: group?.enrolments || 0,
        enrolmentLicenseTotal: group?.enrolmentLicenseTotal || 0,
        userIds: users.map(user => user.id),
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
      <NumberPropertyInput
        inputAttrs={{
          ...register("enrolmentLicenseTotal"),
        }}
        unit={'licenses'}
        className={'text-sm'}
        label="Enrolment license total"
      />
      <NumberPropertyInput
        inputAttrs={{
          ...register("enrolments"),
        }}
        unit={'licenses'}
        className={'text-sm'}
        label="Enrolments"
      />
      <GroupMembers
        title="Organisation Leader"
        groupType="organisation"
        addMembersButtonText="Choose organisation leader"
        addMembersModalText="Organisation leader"
        newMemberRole="Group Leader"
        showRoles={["Group Leader"]}
        isSingle={true}
      />
      <GroupMembers 
        groupType="organisation"
        showRoles={["Member"]}
      />
      <OrganisationCourses />

      <Button type="submit">{buttonText}</Button>
    </form>
  )
}



export default OrganisationForm