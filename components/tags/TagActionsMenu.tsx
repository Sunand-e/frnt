import ActionsMenu from "../common/menus/ActionsMenu"
import useConfirmDelete from "../../hooks/useConfirmDelete"
import useDeleteTag from "../../hooks/tags/useDeleteTag"

const TagActionsMenu = ({tag}) => {
  const editUrl = '/admin/tags/edit'
  const editHref = tag?.id && `${editUrl}?id=${tag.id}`
  
  const { deleteTag } = useDeleteTag()
  const { confirmDelete } = useConfirmDelete({
    itemType: 'category',
    name: tag.label,
    onConfirm: () => deleteTag(tag.id)
  })

  const menuItems = [
    { 
      label: 'Edit category',
      href: editHref,
      capability: 'UpdateTag'
    },
    { 
      label: <span className="text-red-500">Delete category</span>, 
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