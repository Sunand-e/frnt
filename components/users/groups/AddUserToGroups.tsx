import { useState } from "react"
import useAddUsersToGroups from "../../../hooks/groups/useAddUsersToGroups"
import useGetRoles from "../../../hooks/roles/useGetRoles"
import useGetUser from "../../../hooks/users/useGetUser"
import { closeModal } from "../../../stores/modalStore"
import GroupSelectTable from '../../common/tables/GroupSelectTable'

const AddUserToGroups = ({ userId = null, groupTypeName = 'group' }) => {

  const { addUsersToGroups } = useAddUsersToGroups()

  const { user, loading: loadingUser, error } = useGetUser(userId)
  const { roles, loading: loadingRoles } = useGetRoles()

  const defaultRole = roles?.find((role: any) => role.name === 'Member')

  const [selectedGroupIds, setSelectedGroupIds] = useState([])

  const groupFilter = (group: any) => {
    return !user.groups?.edges?.some(userGroupEdge => userGroupEdge.node.id === group.id)
  };

  const onSubmit = (ids: any) => {
    addUsersToGroups({
      userIds: [userId],
      groupIds: ids,
      roleId: defaultRole.id
    });
    closeModal();
  };

  return (
    <GroupSelectTable
      onRowSelect={setSelectedGroupIds}
      selectedGroupIds={selectedGroupIds}
      typeName={groupTypeName}
      groupFilter={groupFilter}
      filters={['global']}
      recipient={user}
      actionName={'Add'}
      onSubmit={onSubmit}
    />
  );
}

export default AddUserToGroups