import { parse } from 'graphql';
import { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDebouncedCallback } from 'use-debounce';
import { TenantContext } from '../../../context/TenantContext';
import useGetCourses from '../../../hooks/courses/useGetCourses';
import useGetGroup from '../../../hooks/groups/useGetGroup';
import useUpdateGroup from '../../../hooks/groups/useUpdateGroup';
import useGetResources from '../../../hooks/resources/useGetResources';
import { disableSubmitOnEnterKey } from '../../../utils/forms';
import { useRouter } from '../../../utils/router';
import Button from '../../common/Button';
import NumberPropertyInput from '../../common/inputs/NumberPropertyInput';
import TextInput from '../../common/inputs/TextInput';
import GroupMembers from '../GroupMembers';
import CoursesDualListBoxInput from '../inputs/CoursesDualListBoxInput';
import GroupUsersInput from '../inputs/GroupUsersInput';
import OrganisationContent from './OrganisationContent';

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

const OrganisationForm = ({organisation=null}) => {

  const router = useRouter()
  const { id } = router.query

  const { group, loading } = useGetGroup(id)
  const { courses, loading: loadingCourses } = useGetCourses()
  const { resources, loading: loadingResources } = useGetResources()
  const { updateGroup } = useUpdateGroup(id)
  
  const debouncedUpdate = useDebouncedCallback((values) => {
    updateGroup(values);
  }, 500);
  
  const { register, setFocus } = useForm<GroupFormValues>(
    {
      defaultValues: {
        ...group,
        name: (group.name === 'Untitled organisation') ? '' : group.name,
        enrolments: group?.enrolments || 0,
        enrolmentLicenseTotal: group?.enrolmentLicenseTotal || 0,
      }
    }
  );
  
  useEffect(() => {
    setFocus('name')
  },[])
   
  return (
    <form
      className='h-full w-full max-w-3xl flex flex-col space-y-4'
      // onSubmit={rhfHandleSubmit(handleSubmit)}
      onKeyDown={disableSubmitOnEnterKey}
    >
      <TextInput
        label="Organisation name"
        placeholder="Organisation name"
        inputAttrs={{
          ...register("name", { maxLength: 100 }),
          onChange: (e => debouncedUpdate({ name: e.target.value }))
        }}
      />
      <NumberPropertyInput
        inputAttrs={{
          ...register("enrolmentLicenseTotal"),
          onChange: (e => debouncedUpdate({ enrolmentLicenseTotal: parseInt(e.target.value) }))
        }}
        unit={'licenses'}
        className={'text-sm'}
        label="Enrolment license total"
      />
      <NumberPropertyInput
        inputAttrs={{
          ...register("enrolments"),
          onChange: (e => debouncedUpdate({ enrolments: parseInt(e.target.value) }))
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
      <OrganisationContent content={courses} contentLoadingStatus={loadingCourses} typeName='course'  />
      {/* <OrganisationContent content={resources} contentLoadingStatus={loadingResources} typeName='resource'  /> */}
      
    </form>
  )
}



export default OrganisationForm