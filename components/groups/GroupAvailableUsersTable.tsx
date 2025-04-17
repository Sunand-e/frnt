import { useState } from 'react';
import { closeModal } from "../../stores/modalStore";
import useAddUsersToGroups from '../../hooks/groups/useAddUsersToGroups';
import UserSelectTable from '../common/tables/UserSelectTable';
import useGetRoles from '../../hooks/roles/useGetRoles';
import { toast } from 'react-toastify';

const GroupAvailableUsersTable = ({ group, roleName='Member', groupType='group' }) => {

  const { addUsersToGroups } = useAddUsersToGroups()
  const { roles, loading: loadingRoles } = useGetRoles()
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);

  const role = roles?.find((role: any) => role.name === roleName)

  const userFilter = (user: any) => {
    let existingUsers = group.users.edges.map((edge: any) => edge.node);
    return !existingUsers.some((existingUser: any) => existingUser.id === user.id);
  }

  const onSubmit = (selectedUserIds: string[]) => {
    toast.loading("Adding user...", { toastId: "add-user-to-group" });
    
    addUsersToGroups({
      groupIds: [group.id],
      userIds: selectedUserIds,
      roleId: role?.id
    },
    () => {
      toast.update('add-user-to-group', {
        render: "Users added successfully",
        type: "success",
        isLoading: false,
        autoClose: 2500,
      });
      closeModal();
    },
    (error: any) => {
      toast.update('add-user-to-group', {
        render: error.message,
        type: "error",
        isLoading: false,
        autoClose: 2500,
      });
      closeModal();
    });
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