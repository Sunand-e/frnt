import { useContext } from "react"
import useDeleteGroup from "../../../hooks/groups/useDeleteGroup"
import useConfirmDelete from "../../../hooks/useConfirmDelete"
import { handleModal } from "../../../stores/modalStore"
import ActionsMenu from "../../common/menus/ActionsMenu"
import SendGroupInvitesModal from "../SendGroupInvitesModal"

const OrganisationAddEnrolmentLicenses = ({group}) => {

  const editUrl = '/admin/users/organisations/edit'
  const editHref = group?.id && `${editUrl}?id=${group.id}`
  
  const { deleteGroup } = useDeleteGroup()
  const { confirmDelete } = useConfirmDelete({
    itemType: 'organisation',
    name: group.title,
    onConfirm: () => deleteGroup(group.id)
  })

  const handleSendInvitations = () => {
    handleModal({
      title: `Send invitations to organisation`,
      content: <SendGroupInvitesModal group={group} />
    })
  }

  const menuItems = [
    { 
      label: 'Edit organisation', 
      href: editHref,
      capability: 'UpdateGroup'
    },
    {
      label: 'Add enrolment licenses',
      onClick: handleSendInvitations,
    },
    // {
    //   label: 'Change enrolment license total',
    //   onClick: handleSendInvitations,
    // },
    {
      label: 'Assign courses', 
      onClick: handleSendInvitations,
    },
    {
      label: <span className="text-red-500">Delete organisation</span>,
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

export default OrganisationAddEnrolmentLicenses