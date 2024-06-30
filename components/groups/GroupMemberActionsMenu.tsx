import ActionsMenu from "../common/menus/ActionsMenu"
import { useCallback } from "react"
import useRemoveUserFromGroup from "../../hooks/groups/useRemoveUserFromGroup"

const GroupMemberActionsMenu = ({group, edge}) => {

  const { removeUserFromGroup } = useRemoveUserFromGroup()
  
  const handleRemove = useCallback(user => {
    if(!group?.id) {
      return false
    }
    removeUserFromGroup({
      groupId: group.id,
      userId: user.node.id,
    })
  }, [group])

  const menuItems = [
    ...(!false ? [{
      label: 'Remove user from group',
      onClick: () => {
        handleRemove(
          edge
        )
      },
      capability: 'RemoveUserFromGroup'
    }]:[]),
  ]
  return (
    <ActionsMenu
      menuItems={menuItems}
      buttonText={'Actions'}
      align={'Right'}
    />
  )
}

export default GroupMemberActionsMenu