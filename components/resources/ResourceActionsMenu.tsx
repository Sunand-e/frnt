import ActionsMenu from "../common/menus/ActionsMenu"
import useConfirmDelete from "../../hooks/useConfirmDelete"
import useDeleteResource from "../../hooks/resources/useDeleteResource"

const ResourceActionsMenu = ({resource}) => {
  const editUrl = '/admin/resources/edit'
  const editHref = resource?.id && `${editUrl}?id=${resource.id}`
  
  const { deleteResource } = useDeleteResource()
  const { confirmDelete } = useConfirmDelete({
    type: 'resource',
    name: resource.title,
    onConfirm: () => deleteResource(resource.id)
  })

  const menuItems = [
    { 
      label: 'Edit resource',
      href: editHref,
      capability: 'UpdateResource'
    },
    { 
      label: <span className="text-red-500">Delete resource</span>, 
      onClick: confirmDelete,
      capability: 'DeleteResource'
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

export default ResourceActionsMenu