import { useCallback, useContext, useMemo } from "react";
import { ModalContext } from "../../../context/modalContext";
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

const UserGroupsTable = () => {

  const router = useRouter()

  const { id } = router.query

  const { loading, error, user } = useGetUser(id)
  const { loading: rolesLoading, error: rolesError, roles } = useGetRoles()
  const { addUsersToGroups } = useAddUsersToGroups()
  const { removeUserFromGroup } = useRemoveUserFromGroup()
  
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

  const handleRemoveFromGroup = (groupId) => {
    removeUserFromGroup({
      userId: user.id,
      groupId,
    })
  }
  const { handleModal } = useContext(ModalContext);
  
  const tableData = useMemo(
    () => {
      return user?.groups.edges.filter(edge => !edge.node._deleted) || []
    }, [user]
  );

  const tableCols = useMemo(() => {
    return [
      {
        header: "Group",
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
        header: ()=><span className="block w-full text-left">Role</span>,
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
        width: 300,
        id: "Actions",

        cell: ({ cell }) => {
          const group = cell.row.original;          
          return (
            <div className="text-right">
              <a className="text-red-600 hover:text-red-800 self-center" href="#" onClick={
                () => handleRemoveFromGroup(cell.row.original.node.id)
              }>Remove from group</a>
            </div>
          )
        }
      }
    ]
  }, [roles]);

  return (
    <Table tableData={tableData} tableCols={tableCols} />
  );
}

export default UserGroupsTable