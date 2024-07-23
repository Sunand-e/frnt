import ActionsMenu from "../common/menus/ActionsMenu"
import useConfirmDelete from "../../hooks/useConfirmDelete"
import useDeleteTag from "../../hooks/tags/useDeleteTag"
import { tagTypes } from "../common/tagTypes"

const TagActionsMenu = ({tag}) => {
  
  const tagType = tagTypes[tag.tagType]
  
  const editUrl = tagType.editUrl
  const editHref = tag?.id && `${editUrl}?id=${tag.id}`
  
  const { deleteTag } = useDeleteTag()
  const { confirmDelete } = useConfirmDelete({
    itemType: tagType.name,
    name: tag.label,
    onConfirm: () => deleteTag(tag.id)
  })

  const menuItems = [
    { 
      label: `Edit ${tagType.name}`,
      href: editHref,
      capability: 'UpdateTag'
    },
    { 
      label: <span className="text-red-500">Delete {tagType.name}</span>,
      onClick: confirmDelete,
      capability: 'DeleteTag'
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

export default TagActionsMenu