import ActionsMenu from "../common/menus/ActionsMenu"
import { getGroupType } from "../common/groupTypes"

const GroupMemberActionsMenu = ({group, edge, onRemove}) => {
  
  const { name: typeName } = getGroupType(group)

  const menuItems = [
    ...(!false ? [{
      label: `Remove user from ${typeName}`,
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