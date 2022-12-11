import ActionsMenu from "../common/menus/ActionsMenu"
import useDeleteUser from "../../hooks/users/useDeleteUser"
import useConfirmDelete from "../../hooks/useConfirmDelete"

const UserActionsMenu = ({user}) => {
  const editUrl = '/admin/users/edit'
  const editHref = user?.id && `${editUrl}?id=${user.id}`
 
  const { deleteUser } = useDeleteUser()
  const { confirmDelete } = useConfirmDelete({
    type: 'user',
    name: user.fullName,
    onConfirm: () => deleteUser(user.id)
  })

  const menuItems = [
    { 
      label: 'Edit user', 
      href: editHref,
      capability: 'UpdateUser'
    },
    {
      label: <span className="text-red-500">Delete user</span>, 
      capability: 'DeleteUser',
      onClick: confirmDelete
    },
  ]

  return (
    <ActionsMenu
      menuItems={menuItems}
      buttonText={'Actions'}
    />
  )
}

export default UserActionsMenu