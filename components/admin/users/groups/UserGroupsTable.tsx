import { useCallback, useContext, useMemo } from "react";
import { ModalContext } from "../../../../context/modalContext";
import useGetRoles from "../../../../hooks/roles/useGetRoles";
import useGetUser from "../../../../hooks/users/useGetUser";
import { useRouter } from "../../../../utils/router";
import Button from "../../../Button";
import ItemWithImageTableCell from "../../../common/cells/ItemWithImageTableCell";
import Table from "../../../Table";
import UserRoleSelect from "../inputs/UserRoleSelect";
import useAddUsersToGroups from "../../../../hooks/groups/useAddUsersToGroups";
import useRemoveUserFromGroup from "../../../../hooks/groups/useRemoveUserFromGroup";
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

  const { handleModal } = useContext(ModalContext);
  
  const tableData = useMemo(
    () => {
      return user?.groups.edges.filter(edge => !edge.node._deleted) || []
    }, [user]
  );

  const tableCols = useMemo(() => {
    return [
      {
        Header: "Group",
        accessor: "node.name",
        Cell: ({ cell }) => {
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
            <ItemWithImageTableCell { ...cellProps } />
          )
        },
      },
      {
        Header: ()=><span className="block w-full text-left">Role</span>,
        accessor: 'roles',
        Cell: ({ cell }) => {
          const group = cell.row.original;
          const handleChange = role => handleChangeRole(group, role);
          return (
            <UserRoleSelectCell onChange={handleChange} cell={cell} roleType={'group_role'} />
          )
        }
      },
      {
        width: 300,
        Header: "Actions",

        Cell: ({ cell }) => {
          const group = cell.row.original;
          return <a className="text-red-600 hover:text-red-800" href="#" onClick={() => {
            removeUserFromGroup({
              userId: user.id,
              groupId: group.node.id,
            })
          }}>Remove from group</a>
        }
      }
    ]
  }, [roles]);

  return (
    <Table tableData={tableData} tableCols={tableCols} />
  );
}

export default UserGroupsTable