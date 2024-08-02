import ActionsMenu from "../../common/menus/ActionsMenu"

const UserGroupActionsMenu = ({user, group, onRemove}) => {

  const menuItems = [
    {
      label: 'Remove from group',
      onClick: () => onRemove([group.node.id]),
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