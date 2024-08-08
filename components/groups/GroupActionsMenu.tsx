import useDeleteGroup from "../../hooks/groups/useDeleteGroup"
import useConfirmDelete from "../../hooks/useConfirmDelete"
import { handleModal } from "../../stores/modalStore"
import { getGroupEditUrl, getGroupType } from "../common/groupTypes"
import ActionsMenu from "../common/menus/ActionsMenu"
import SendGroupInvitesModal from "./SendGroupInvitesModal"

const GroupActionsMenu = ({group}) => {
  
  const { name: typeName } = getGroupType(group)

  const { deleteGroup } = useDeleteGroup()
  const { confirmDelete } = useConfirmDelete({
    itemType: 'group',
    name: group.title,
    onConfirm: () => deleteGroup(group.id)
  })

  const handleSendInvitations = () => {
    handleModal({
      title: `Send invitations to ${typeName} members`,
      content: <SendGroupInvitesModal groupId={group.id} />
    })
  }

  const menuItems = [
    { 
      label: `Edit ${typeName}`,
      href: getGroupEditUrl(group),
      capability: 'UpdateGroup'
    },
    {
      label: 'Send user invitations', 
      onClick: handleSendInvitations,
    },
    { 
      label: <span className="text-red-500">Delete {typeName}</span>,
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