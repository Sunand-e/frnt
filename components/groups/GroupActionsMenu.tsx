import { useContext } from "react"
import { ModalContext } from "../../context/modalContext"
import ActionsMenu from "../common/menus/ActionsMenu"
import DeleteGroupModal from "./DeleteGroupModal"

const GroupActionsMenu = ({group}) => {
  const { handleModal } = useContext(ModalContext)
  const editUrl = '/admin/users/groups/edit'
  const editHref = group?.id && `${editUrl}?id=${group.id}`
  
  const handleDeleteClick = () => {
    handleModal({
      title: `Delete group`,
      content: <DeleteGroupModal groupId={group?.id} />
    })
  }
  const menuItems = [
    { label: 'Edit group', href: editHref },
    { label: 'Send user invites', href: '#' },
    { label: <span className="text-red-500">Delete group</span>, onClick: handleDeleteClick },
    // { title: 'Settings', href:'settings' },
  ]
  return (
    <ActionsMenu
      menuItems={menuItems}
      buttonText={'Actions'}
    />
  )
}

export default GroupActionsMenu