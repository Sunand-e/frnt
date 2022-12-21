import ActionsMenu from "../../common/menus/ActionsMenu"
import { useCallback } from "react"
import useRemoveUserFromGroup from "../../../hooks/groups/useRemoveUserFromGroup"

const UserGroupActionsMenu = ({user, group}) => {

  const reportsUrl = '/admin/groups/edit'
  
  const {removeUserFromGroup} = useRemoveUserFromGroup()
  
  const handleRemove = useCallback((group) => {
    if(!user?.id) {
      return false
    }
    removeUserFromGroup({
      userId: user.id,
      groupId: group.node.id,
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
      capability: 'RemoveUserFromGroup'
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