import ActionsMenu from "../../common/menus/ActionsMenu"
import { useCallback } from "react"
import useRemoveUsersFromGroups from "../../../hooks/groups/useRemoveUsersFromGroups"

const UserGroupActionsMenu = ({user, group}) => {

  const reportsUrl = '/admin/groups/edit'
  
  const {removeUsersFromGroups} = useRemoveUsersFromGroups()
  
  const handleRemove = useCallback((group) => {
    if(!user?.id) {
      return false
    }
    removeUsersFromGroups({
      userIds: [user.id],
      groupIds: [group.node.id],
    })
  }, [user])
  
  const menuItems = [
    {
      label: 'Remove from group',
      onClick: () => {
        handleRemove(
          group,
        )
      },
      capability: 'RemoveUsersFromGroups'
    },
    // { title: 'Settings', href:'settings' },
  ]
  return (
    <ActionsMenu
      menuItems={menuItems}
      buttonText={'Actions'}
    />
  )
}

export default UserGroupActionsMenu