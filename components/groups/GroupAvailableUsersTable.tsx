import { useState } from 'react';
import { closeModal } from "../../stores/modalStore";
import ContentSelectTable from "../common/tables/ContentSelectTable";
import useAddUsersToGroups from '../../hooks/groups/useAddUsersToGroups';
import UserSelectTable from '../common/tables/UserSelectTable';
import useGetRoles from '../../hooks/roles/useGetRoles';

const GroupAvailableUsersTable = ({ group, roleName='Member', groupType='group' }) => {

  const { addUsersToGroups } = useAddUsersToGroups()
  const { roles, loading: loadingRoles } = useGetRoles()
  const [selectedUserIds, setSelectedUserIds] = useState([]);

  const role = roles?.find(role => role.name === roleName)

  const userFilter = (user) => {
    let existingUsers = group.users.edges.map(edge => edge.node);
    return !existingUsers.some(existingUser => existingUser.id === user.id);
  }

  const onSubmit = (selectedUserIds) => {
    addUsersToGroups({
      groupIds: [group.id],
      userIds: selectedUserIds,
      roleId: role?.id
    });
    closeModal();
  };

  return (
    <UserSelectTable
      onRowSelect={setSelectedUserIds}
      selectedUserIds={selectedUserIds}
      userFilter={userFilter}
      filters={['global']}
      recipientType={groupType}
      recipient={group}
      actionName={'Add'}
      onSubmit={onSubmit}
    />
  );
};

export default GroupAvailableUsersTable;