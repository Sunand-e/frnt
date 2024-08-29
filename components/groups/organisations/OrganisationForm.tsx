import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDebouncedCallback } from 'use-debounce';
import useGetGroup from '../../../hooks/groups/useGetGroup';
import useUpdateGroup from '../../../hooks/groups/useUpdateGroup';
import { handleModal } from '../../../stores/modalStore';
import { disableSubmitOnEnterKey } from '../../../utils/forms';
import { useRouter } from '../../../utils/router';
import Button from '../../common/Button';
import Tabs from '../../common/containers/Tabs';
import NumberPropertyInput from '../../common/inputs/NumberPropertyInput';
import TextInput from '../../common/inputs/TextInput';
import GroupContent from '../GroupContent';
import GroupUsers from '../GroupUsers';
import IssueGroupCredits from '../IssueGroupCredits';

interface GroupFormValues {
  id?: string
  name: string 
  email: string
  groupImage: string
  userRole: string
  isOrganisation: boolean
  creditsUsed: number
  creditTotal: number
}

const OrganisationForm = ({groupType='organisation'}) => {

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
        name: (group.name === 'Untitled organisation') ? '' : group.name,
        creditsUsed: group?.creditsUsed || 0,
        creditTotal: group?.creditTotal || 0,
      }
    }
  );
  
  const [activeGroupUsersTab, setActiveGroupUsersTab] = useState('members')

  const groupUsersTabs = [
    {name: 'members', title: 'Members'},
    {name: 'leaders', title: 'Leader'}
  ]

  const handleIssueCredits = () => {
    handleModal({
      title: `Issue credits`,
      content: <IssueGroupCredits
       groupId={group.id}
      />
    })
  }

  useEffect(() => {
    setFocus('name')
  },[])
   
  return (
    <form
      className='h-full w-full max-w-3xl flex flex-col'
      // onSubmit={rhfHandleSubmit(handleSubmit)}
      onKeyDown={disableSubmitOnEnterKey}
    >
      <div className='space-y-4'>
      <TextInput
        label="Organisation name"
        placeholder="Organisation name"
        inputAttrs={{
          ...register("name", { maxLength: 100 }),
          onChange: (e => debouncedUpdate({ name: e.target.value }))
        }}
      />
      
      <div className='flex items-center mb-2'>
        <div>Credits: <span className='font-bold'>{group.creditTotal}</span></div>
        <Button displayType='white' onClick={() => handleIssueCredits(group.id)}>Issue Credits</Button>
      </div>
      </div>
      <div className='mt-2 mb-12'>
        <Tabs 
          tabs={groupUsersTabs}
          activeTab={activeGroupUsersTab}
          setActiveTab={setActiveGroupUsersTab}
        />
        { activeGroupUsersTab === 'members' && (
          <GroupUsers 
            groupType="organisation"
            showRoles={["Member"]}
          />
        )}
        { activeGroupUsersTab === 'leaders' && (
          <GroupUsers
            title="Organisation Leader"
            groupType="organisation"
            addMembersButtonText="Choose organisation leader"
            addMembersModalText="Organisation leader"
            newMemberRole="Group Leader"
            showRoles={["Group Leader"]}
            isSingle={true}
          />
      )}
      </div>
      <GroupContent associationTypeName='provided' groupType='organisation' typeName='course'  />
    </form>
  )
}



export default OrganisationForm