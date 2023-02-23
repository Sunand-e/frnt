import ActionsMenu from "../../common/menus/ActionsMenu"
import { useCallback } from "react"
import useRemoveTagsFromContent from "../../../hooks/contentItems/useRemoveTagsFromContent"

const TagContentActionsMenu = ({tag, item, contentType}) => {

  const {removeTagsFromContent} = useRemoveTagsFromContent()

  const handleRemove = useCallback(() => {
    if(!tag?.id) {
      return false
    }
    removeTagsFromContent({
      tagIds: [tag.id],
      contentItemIds: [item.node.id],
    }, () => {
      
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