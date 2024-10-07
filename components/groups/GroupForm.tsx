import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDebouncedCallback } from 'use-debounce';
import useGetGroup from '../../hooks/groups/useGetGroup';
import useUpdateGroup from '../../hooks/groups/useUpdateGroup';
import { handleModal } from '../../stores/modalStore';
import { disableSubmitOnEnterKey } from '../../utils/forms';
import { useRouter } from '../../utils/router';
import Button from '../common/Button';
import Tabs from '../common/containers/Tabs';
import NumberPropertyInput from '../common/inputs/NumberPropertyInput';
import TextInput from '../common/inputs/TextInput';
import GroupContent from './GroupContent';
import GroupUsers from './GroupUsers';
import { InformationCircle } from '@styled-icons/heroicons-solid/InformationCircle';
import { groupTypes } from '../common/groupTypes';
import GroupCredits from './inputs/GroupCredits';
interface GroupFormValues {
  id?: string
  name: string 
  email: string
  groupImage: string
  userRole: string
  isOrganisation: boolean
  // creditsUsed: number
  // creditTotal: number
}

const GroupForm = ({typeName='group'}) => {

  const type = groupTypes[typeName]

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
        name: (group.name === `Untitled ${type.name}`) ? '' : group.name,
        // creditsUsed: group?.creditsUsed || 0,
        // creditTotal: group?.creditTotal || 0,
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
      onKeyDown={disableSubmitOnEnterKey}
    >
      <TextInput
        label={`${type.label} name`}
        placeholder={`${type.label} name`}
        inputAttrs={{
          ...register("name", { maxLength: 100 }),
          onChange: (e => debouncedUpdate({ name: e.target.value }))
        }}
      />
      
      {typeName === 'organisation' && <GroupCredits group={group} />}

      <div>
        <Tabs activeTab={activeGroupUsersTab} setActiveTab={setActiveGroupUsersTab} tabs={groupUsersTabs} />
        {activeGroupUsersTab === 'members' && <GroupUsers typeName={typeName} showRoles={['Member']} />}
        {activeGroupUsersTab === 'leaders' && (
          <GroupUsers
            title={`${type.label} Leaders`}
            addMembersButtonText={`Choose ${type.name} leaders`}
            addMembersModalText={`${type.label} leader(s)`}
            newMemberRole='Group Leader'
            showRoles={['Group Leader']}
            isSingle={typeName === 'organisation'}
          />
        )}
      </div>
      <div>
        <Tabs
          activeTab={activeAssociatedContentTab}
          setActiveTab={setActiveAssociatedContentTab}
          tabs={associatedContentTabs}
        />
        { activeAssociatedContentTab === 'assigned' && (
          <>
            <span className='flex items-start text-sm mb-2'>
            <InformationCircle className='w-6 h-6 -mt-0.5 mr-2 text-main-lightness-70 shrink-0' />
              <p className='text-sm mb-2'>When content is 'assigned' to {type.withIndefiniteArticle}, all {type.name} members will gain access to that content.</p>
            </span>
            <GroupContent typeName='content' associationTypeName='assigned' />
          </>
        )}
        { activeAssociatedContentTab === 'provided' && (
          <>
            <span className='flex items-start text-sm mb-2'>
              <InformationCircle className='w-6 h-6 -mt-0.5 mr-2 text-main-lightness-70 shrink-0' />
              <p className='text-sm'>When content is 'provided' to {type.withIndefiniteArticle}, {type.withIndefiniteArticle} leader can individually assign that content to any user within the {type.name}.</p>
            </span>
            <GroupContent typeName='content' associationTypeName='provided' />
          </>
        )}
      </div>
    </form>
  )
}



export default GroupForm