import { useContext } from "react"
import ActionsMenu from "../common/menus/ActionsMenu"
import { ModalContext } from "../../context/modalContext"
import DeleteUserModal from "./DeleteUserModal"

const UserActionsMenu = ({user}) => {
  const { handleModal } = useContext(ModalContext)
  const editUrl = '/admin/users/edit'
  const editHref = user?.id && `${editUrl}?id=${user.id}`
  
  const handleDeleteClick = () => {
    handleModal({
      title: `Delete user`,
      content: <DeleteUserModal userId={user?.id} />
    })
  }
  const menuItems = [
    { label: 'Edit user', href: editHref },
    { label: <span className="text-red-500">Delete user</span>, onClick: handleDeleteClick },
    // { title: 'Settings', href:'settings' },
  ]
  return (
    <ActionsMenu
      menuItems={menuItems}
      buttonText={'Actions'}
    />
  )
}

export default UserActionsMenu