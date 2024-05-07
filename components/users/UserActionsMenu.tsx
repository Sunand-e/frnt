import ActionsMenu from "../common/menus/ActionsMenu"
import useDeleteUser from "../../hooks/users/useDeleteUser"
import useConfirmDelete from "../../hooks/useConfirmDelete"
import useSendInvite from "../../hooks/useSendInvite"
import useUserHasCapability from "../../hooks/users/useUserHasCapability"
import useGetCurrentUser from "../../hooks/users/useGetCurrentUser"
import { useRequestSwitchUser } from "../../hooks/users/useRequestSwitchUser"
import { handleModal } from "../../stores/modalStore"
import EnrolUserInContent from "./content/EnrolUserInContent"

const UserActionsMenu = ({user}) => {

  const editUrl = '/admin/users/edit'
  const editHref = user?.id && `${editUrl}?id=${user.id}`
 
  const { userHasCapability } = useUserHasCapability()
  const { requestSwitchUser } = useRequestSwitchUser({user})
  const { sendInvite } = useSendInvite()
  const { user: currentUser, courses } = useGetCurrentUser()
  const { deleteUser } = useDeleteUser()
  const { confirmDelete } = useConfirmDelete({
    itemType: 'user',
    name: user.fullName,
    onConfirm: () => deleteUser(user.id)
  })

  
  const assignCourses = () => {
    handleModal({
      title: 'Assign courses',
      content: <EnrolUserInContent user={user} typeName='course' />
    })
  }

  let showAssignCourses
  
  if(userHasCapability('EnrolUsersInContent', 'tenant')) {
    showAssignCourses = true
  } else {
    // if the current user has the EnrolUsersInContent capability for a group that the user is in, show the Assign courses button
    showAssignCourses = user.groups.edges.some(groupEdge => {
      return userHasCapability('EnrolUsersInContent', 'group', groupEdge.node.id)
    })
  }


  const menuItems = [
    { 
      label: 'Edit user', 
      href: editHref,
      capability: 'UpdateUser'
    },
    {
      label: 'Act as user',
      capability: 'ActAsAnyUser',
      onClick: requestSwitchUser
    },
    {
      label: 'Assign course(s)',
      capability: 'EnrolUsersInContent',
      onClick: assignCourses,
    },
    {
      label: 'Send invitation',
      onClick: () => sendInvite(user.id),
      show: !user.invitationAcceptedAt
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