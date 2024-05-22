import { useCallback, useContext, useMemo } from "react";
import useGetRoles from "../../../hooks/roles/useGetRoles";
import useGetUser from "../../../hooks/users/useGetUser";
import { useRouter } from "../../../utils/router";
import Button from "../../common/Button";
import ItemWithImage from "../../common/cells/ItemWithImage";
import Table from "../../common/tables/Table";
import UserRoleSelect from "../inputs/UserRoleSelect";
import useAddUsersToGroups from "../../../hooks/groups/useAddUsersToGroups";
import useRemoveUserFromGroup from "../../../hooks/groups/useRemoveUserFromGroup";
import UserRoleSelectCell from "./UserRoleSelectCell";
import UserGroupActionsMenu from "./UserGroupActionsMenu";
import { handleModal } from "../../../stores/modalStore";
import useTenantFeaturesEnabled from "../../../hooks/users/useTenantFeaturesEnabled";

const UserGroupsTable = () => {

  const router = useRouter()

  const { id } = router.query

  const { loading, error, user } = useGetUser(id)
  const { loading: rolesLoading, error: rolesError, roles } = useGetRoles()
  const { addUsersToGroups } = useAddUsersToGroups()
  const { removeUserFromGroup } = useRemoveUserFromGroup()
  
  const { tenantFeaturesEnabled } = useTenantFeaturesEnabled()
  
  const handleChangeRole = useCallback((group, role) => {
    if(!user?.id) {
      return false
    }

    removeUserFromGroup({
      userId: user.id,
      groupId: group.node.id,
    })

    addUsersToGroups({
      userIds: [user.id],
      groupIds: [group.node.id],
      roleId: role.id
    })
  }, [user])
  
  const tableData = useMemo(
    () => {
      return user?.groups.edges
        .filter(edge => !edge.node._deleted)
        .sort((a, b) => a.node.name.localeCompare(b.node.name)) || []
    }, [user]
  );

  const groupColHeader = tenantFeaturesEnabled(['organisations']) ? 'Group / Organisation' : 'Group'

  const tableCols = useMemo(() => {
    return [
      {
        header: groupColHeader,
        id: 'name',
        accessorFn: row => row.node.name,
        cell: ({ cell }) => {
          const group = cell.row.original.node;
          const cellProps = {
            title: group.name,
            style: {
              width: '200px'
            },
            // secondary: JSON.stringify(cell.row.original),
            // href: cell.row.original.id && `${editUrl}?id=${cell.row.original.id}`
          }
          return (
            <ItemWithImage { ...cellProps } />
          )
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
          )
        }
      },
      {
        header: "Actions",
        accessorKey: "actions",
        enableSorting: false,
        cell: ({ cell }) => <UserGroupActionsMenu user={user} group={cell.row.original} />
      },
    ]
  }, [roles]);
  
  const tableProps = {
    tableData,
    tableCols,
    showTop: false,
  }
    
  return (
    <Table { ...tableProps } />
  );
}

export default UserGroupsTable