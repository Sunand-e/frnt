import ActionsMenu from "../../common/menus/ActionsMenu"
import { useCallback } from "react"

const TagPathwayActionsMenu = ({tag, pathway}) => {
    
  const handleRemove = useCallback(content => {
    if(!tag?.id) {
      return false
    }
    console.log({
      tagId: tag.id,
      contentItemId: content.node.id,
    })
  }, [tag])
  
  const menuItems = [
    {
      label: 'Remove pathway',
      onClick: () => {
        handleRemove(pathway)
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

export default TagPathwayActionsMenu