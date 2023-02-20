import ActionsMenu from "../../common/menus/ActionsMenu"
import { useCallback } from "react"

const TagContentActionsMenu = ({tag, item, contentType}) => {

  const handleRemove = useCallback(() => {
    if(!tag?.id) {
      return false
    }
    console.log({
      tagId: tag.id,
      contentItemId: item.node.id,
    })
  }, [tag, item])
  
  const menuItems = [
    {
      label: `Remove ${contentType.name}`,
      onClick: handleRemove,
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