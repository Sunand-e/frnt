import ActionsMenu from "../../common/menus/ActionsMenu"
import { useCallback } from "react"

const TagCourseActionsMenu = ({tag, course}) => {

  const handleRemove = useCallback((content, role) => {
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
      label: 'Remove course',
      onClick: () => {
        handleRemove(
          course,
          null,
        )
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

export default TagCourseActionsMenu