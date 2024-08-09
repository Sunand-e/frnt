import { useCallback, useMemo } from "react";
import useAddUsersToGroups from "../../../hooks/groups/useAddUsersToGroups";
import useRemoveUsersFromGroups from "../../../hooks/groups/useRemoveUsersFromGroups";
import useGetRoles from "../../../hooks/roles/useGetRoles";
import useGetUser from "../../../hooks/users/useGetUser";
import { handleModal } from "../../../stores/modalStore";
import { commonTableCols } from "../../../utils/commonTableCols";
import { useRouter } from "../../../utils/router";
import GroupTitleCell from "../../common/cells/GroupTitleCell";
import { getGroupType, groupTypes } from "../../common/groupTypes";
import BoxContainerTable from "../../common/tables/BoxContainerTable";
import AddUserToGroups from "./AddUserToGroups";
import UserGroupActionsMenu from "./UserGroupActionsMenu";
import UserRoleSelectCell from "./UserRoleSelectCell";

const UserGroups = ({ groupTypeName = 'group', isSingular = false }) => {
  const router = useRouter();
  const { id } = router.query;
  const { loading, error, user } = useGetUser(id);
  const { loading: rolesLoading, error: rolesError, roles } = useGetRoles();
  const { addUsersToGroups } = useAddUsersToGroups();
  const { removeUsersFromGroups } = useRemoveUsersFromGroups();
  const groupType = groupTypes[groupTypeName];

  const openAddUsersToGroups = () => {
    handleModal({
      title: `Assign user to ${isSingular ? groupType.name : groupType.plural}`,
      content: <AddUserToGroups groupTypeName={groupTypeName} isSingular={isSingular} userId={user.id} />,
      size: 'lg'
    });
  };

  const button = {
    text: `Assign to ${isSingular ? groupType.name : groupType.plural}`,
    onClick: openAddUsersToGroups
  };

  const handleChangeRole = useCallback((group, role) => {
    removeUsersFromGroups({
      userIds: [user.id],
      groupIds: [group.node.id]
    });

    addUsersToGroups({
      userIds: [user.id],
      groupIds: [group.node.id],
      roleId: role.id
    });
  }, [user, addUsersToGroups, removeUsersFromGroups]);

  const handleRemove = useCallback(ids => {
    removeUsersFromGroups({
      userIds: [user.id],
      groupIds: ids,
    });
  }, [user, removeUsersFromGroups]);

  const bulkActions = [
    {
      label: `Remove from selected group(s)`,
      labelFn: (ids: Array<string>) => `Remove from selected group(s)`,
      onClick: (ids: Array<string>) => handleRemove(ids),
    }
  ]

  const tableData = useMemo(
    () => {
      return user?.groups.edges.filter(edge => (
        !edge.node._deleted && getGroupType(edge.node).name === groupTypeName
      )).sort((a, b) => a.node.name.localeCompare(b.node.name)) || [];
    }, [user, groupTypeName]
  );

  const tableCols = useMemo(() => {
    return [
      {
        header: groupType.label,
        id: 'name',
        accessorFn: row => row.node.name,
        cell: ({ cell }) => {
          const group = cell.row.original.node;
          const props = {
            style: {
              width: '200px'
            },
          };
          return <GroupTitleCell group={group} itemWithImageProps={props} />;
        },
      },
      {
        header: 'Role',
        accessorKey: 'roles',
        cell: ({ cell }) => {
          const group = cell.row.original;
          const handleChange = role => handleChangeRole(group, role);
          return (
            <UserRoleSelectCell onChange={handleChange} cell={cell} roleType={'group_role'} />
          );
        }
      },
      {
        ...commonTableCols.actions,
        cell: ({ cell }) => <UserGroupActionsMenu group={cell.row.original.node} onRemove={handleRemove} />
      },
    ];
  }, [roles, handleChangeRole, handleRemove, groupType.label]);

  const tableProps = {
    tableData,
    tableCols,
    bulkActions
  };

  return (
    <BoxContainerTable
      title={isSingular ? groupType.label : groupType.pluralLabel}
      icon={groupType.icon}
      button={button}
      tableProps={tableProps}
    />
  );
};

export default UserGroups;