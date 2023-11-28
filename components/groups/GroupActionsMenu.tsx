import { useContext } from "react"
import useDeleteGroup from "../../hooks/groups/useDeleteGroup"
import useConfirmDelete from "../../hooks/useConfirmDelete"
import { handleModal } from "../../stores/modalStore"
import ActionsMenu from "../common/menus/ActionsMenu"
import SendGroupInvitesModal from "./SendGroupInvitesModal"

const GroupActionsMenu = ({group}) => {

  const editUrl = '/admin/users/groups/edit'
  const editHref = group?.id && `${editUrl}?id=${group.id}`
  
  const { deleteGroup } = useDeleteGroup()
  const { confirmDelete } = useConfirmDelete({
    itemType: 'group',
    name: group.title,
    onConfirm: () => deleteGroup(group.id)
  })

  const handleSendInvitations = () => {
    handleModal({
      title: `Send invitations to group`,
      content: <SendGroupInvitesModal group={group} />
    })
  }

  const menuItems = [
    { 
      label: 'Edit group', 
      href: editHref,
      capability: 'UpdateGroup'
    },
    {
      label: 'Send user invitations', 
      onClick: handleSendInvitations,
    },
    { 
      label: <span className="text-red-500">Delete group</span>,
      onClick: confirmDelete,
      capability: 'DeleteGroup'
    },
  ]

  return (
    <ActionsMenu
      menuItems={menuItems}
      buttonText={'Actions'}
    />
  )
}

export default GroupActionsMenu