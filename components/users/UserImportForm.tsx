import FileUploader from '../common/FileUploader';
import { useContext, useEffect, useState } from 'react';
import UserImportAccordion from './UserImportAccordion';
import ButtonLink from '../common/ButtonLink';
import DropzoneIconAndText from '../common/inputs/DropzoneIconAndText';
import { handleModal } from '../../stores/modalStore';
import useUserHasCapability from '../../hooks/users/useUserHasCapability';
import GroupSelect from '../groups/inputs/GroupSelect';
import useGetGroups from '../../hooks/groups/useGetGroups';
import { GET_USERS } from '../../graphql/queries/users';

const UserImportForm = () => {

  const { determineCapabilityScope } = useUserHasCapability()

  const addUsersToGroupsCapabilityScope = determineCapabilityScope('AddUsersToGroups')

  const { groups } = useGetGroups()

  const [groupId, setGroupId] = useState(null)
  
  let showAddUsersToGroupsInput = false
  if(addUsersToGroupsCapabilityScope.tenant === true || addUsersToGroupsCapabilityScope.groups.length > 1) {
    showAddUsersToGroupsInput = true
  }
  
  useEffect(() => {
    if(addUsersToGroupsCapabilityScope.tenant === false) {
      setGroupId(addUsersToGroupsCapabilityScope.groups[0])
    }
  }, [determineCapabilityScope, addUsersToGroupsCapabilityScope])

  const handleAllUploadsComplete = (data) => {
    handleModal({
      title: 'CSV upload successful',
      content: (
        <>
          <UserImportAccordion data={data?.[0]?.data} groupId={groupId} />
        </>
      )
    })
    // router.push('/admin/users')
  }

  const dropZoneContent = <DropzoneIconAndText
    fileHintText="CSV, up to 10MB"
    linkText="Upload a CSV file"
  />

  const fileUploaderProps = {
    accept: [
      '.csv', 
      'text/csv', 
      'application/vnd.ms-excel',
      'application/csv',
      'text/x-csv',
      'application/x-csv',
      'text/comma-separated-values',
      'text/x-comma-separated-values'
    ],
    
    dropZoneContent,
    endpoint: "/api/v1/users/bulk_import",
    refetchQuery: GET_USERS,
    fileParameterName: 'csv_file',
    onAllUploadsComplete: handleAllUploadsComplete,
  }

  const groupFilter = edge => {
    return addUsersToGroupsCapabilityScope.tenant || addUsersToGroupsCapabilityScope.groups.includes(edge.node.id)
  }

  return <>
    <FileUploader {...fileUploaderProps} additionalParams={{group_id: groupId}}  />
    <div className='flex flex-col mt-4 space-y-4 w-full max-w-sm' >
      <ButtonLink href="/docs/import_user_example.csv">
        Download an example CSV
      </ButtonLink>

      { showAddUsersToGroupsInput && (
      <label className={`block`}>
        <span className="text-sm font-medium text-gray-700">Add users to group: </span>
        <GroupSelect
          onSelect={(value) => {
            setGroupId(value?.id)
          }}
          className='w-full'
          groupFilter={groupFilter}
          defaultValueId={groupId}
          isClearable={addUsersToGroupsCapabilityScope.tenant === true}
        />
      </label>
      )}
    </div>
  </>
}

export default UserImportForm