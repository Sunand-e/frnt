import ActionsMenu from "../common/menus/ActionsMenu"
import { useCallback } from "react"
import useRemoveUsersFromGroups from "../../hooks/groups/useRemoveUsersFromGroups"

const GroupMemberActionsMenu = ({group, edge, onRemove}) => {
  
  const groupTypeName = group.isOrganisation ? 'organisation' : 'group'

  const menuItems = [
    ...(!false ? [{
      label: `Remove user from ${groupTypeName}`,
      onClick: () => {
        onRemove(edge.node.id)
      },
      capability: 'RemoveUsersFromGroups'
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