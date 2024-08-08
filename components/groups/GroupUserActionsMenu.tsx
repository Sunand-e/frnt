import ActionsMenu from "../common/menus/ActionsMenu"
import { getGroupType } from "../common/groupTypes"
import { getUserEditUrl } from "../../utils/getUserEditUrl"

const GroupUserActionsMenu = ({group, edge, onRemove}) => {
  
  const { name: typeName } = getGroupType(group)

  const menuItems = [
    ...(!false ? [{
      label: `Remove user from ${typeName}`,
      onClick: () => {
        onRemove(edge.node.id)
      },
      capability: 'RemoveUsersFromGroups'
    }]:[]),
    { 
      label: 'Edit user', 
      href: getUserEditUrl(edge.node),
      capability: 'UpdateUser'
    },
  ]
  return (
    <ActionsMenu
      menuItems={menuItems}
      buttonText={'Actions'}
      align={'Right'}
    />
  )
}

export default GroupUserActionsMenu