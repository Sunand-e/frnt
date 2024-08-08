import { getGroupEditUrl, getGroupType } from "../../common/groupTypes"
import ActionsMenu from "../../common/menus/ActionsMenu"

const UserGroupActionsMenu = ({user, group, onRemove}) => {

  const type = getGroupType(group)
  const menuItems = [
    {
      label: `Remove from ${type.name}`,
      onClick: () => onRemove([group.node.id]),
      capability: 'RemoveUsersFromGroups'
    },
    {
      label: `Edit ${type.name}`,
      href: getGroupEditUrl(group),
      capability: 'UpdateGroup'
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