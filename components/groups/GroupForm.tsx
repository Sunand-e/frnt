import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDebouncedCallback } from 'use-debounce';
import useGetGroup from '../../hooks/groups/useGetGroup';
import useUpdateGroup from '../../hooks/groups/useUpdateGroup';
import { disableSubmitOnEnterKey } from '../../utils/forms';
import { useRouter } from '../../utils/router';
import Tabs from '../common/containers/Tabs';
import NumberPropertyInput from '../common/inputs/NumberPropertyInput';
import TextInput from '../common/inputs/TextInput';
import GroupContent from './GroupContent';
import GroupUsers from './GroupUsers';

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

const GroupForm = ({groupType='group'}) => {

  const router = useRouter()
  const { id } = router.query

  const { group, loading } = useGetGroup(id)
  const { updateGroup } = useUpdateGroup(id)
  
  const debouncedUpdate = useDebouncedCallback((values) => {
    updateGroup(values);
  }, 500);
  
  const { register, setFocus } = useForm<GroupFormValues>(
    {
      defaultValues: {
        ...group,
        name: (group.name === `Untitled ${groupType}`) ? '' : group.name,
        enrolments: group?.enrolments || 0,
        enrolmentLicenseTotal: group?.enrolmentLicenseTotal || 0,
      }
    }
  );
  
  const [activeAssociatedContentTab, setActiveAssociatedContentTab] = useState('assigned')
  const [activeGroupUsersTab, setActiveGroupUsersTab] = useState('members')

  const associatedContentTabs = [
    {name: 'assigned', title: 'Assigned Content'},
    {name: 'provided', title: 'Provided Content'}
  ]
  const groupUsersTabs = [
    {name: 'members', title: 'Members'},
    {name: 'leaders', title: 'Leaders'}
  ]


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
        label="Group name"
        placeholder="Group name"
        inputAttrs={{
          ...register("name", { maxLength: 100 }),
          onChange: (e => debouncedUpdate({ name: e.target.value }))
        }}
      />
      { groupType === 'organisation' && (
        <>
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
        </>
      )}
      
      <Tabs
        activeTab={activeGroupUsersTab}
        setActiveTab={setActiveGroupUsersTab}
        tabs={groupUsersTabs}
        className='mb-4'
      />
      { activeGroupUsersTab === 'members' && (
        <GroupUsers 
          groupType="group"
          showRoles={["Member"]}
        />
      )}
      { activeGroupUsersTab === 'leaders' && (
        <GroupUsers
          title=" Group Leaders"
          groupType="group"
          addMembersButtonText="Choose group leaders"
          addMembersModalText="Group leader(s)"
          newMemberRole="Group Leader"
          showRoles={["Group Leader"]}
        />
      )}
      <Tabs
        activeTab={activeAssociatedContentTab}
        setActiveTab={setActiveAssociatedContentTab}
        tabs={associatedContentTabs}
        className='mb-4'
      />
      { activeAssociatedContentTab === 'assigned' && (
        <>
          <p className='text-sm'>When content is 'assigned' to a group, then all group members will gain access to that content.</p>
          <GroupContent typeName='content' associationTypeName='assigned' />
        </>
      )}
      { activeAssociatedContentTab === 'provided' && (
        <>
          <p className='text-sm'>When content is 'provided' to a group, then a group leader of the group can individually assign that content to any user within the group.</p>
          <GroupContent typeName='content' associationTypeName='provided' />
        </>
      )}
    </form>
  )
}



export default GroupForm