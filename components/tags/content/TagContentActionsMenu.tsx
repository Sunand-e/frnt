import ActionsMenu from "../../common/menus/ActionsMenu"

const TagContentActionsMenu = ({item, contentType, onRemove}) => {

  const menuItems = [
    {
      label: `Remove ${contentType.name}`,
      onClick: () => {
        onRemove(item.node.id)
      },
      capability: 'AddTagsToContent'
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

export default TagContentActionsMenu