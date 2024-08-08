import ActionsMenu from "../common/menus/ActionsMenu"
import useConfirmDelete from "../../hooks/useConfirmDelete"
import useDeleteResource from "../../hooks/resources/useDeleteResource"
import { getContentEditUrl } from "../common/contentTypes"

const ResourceActionsMenu = ({content: resource}) => {
  
  const { deleteResource } = useDeleteResource()
  const { confirmDelete } = useConfirmDelete({
    itemType: 'resource',
    name: resource.title,
    onConfirm: () => deleteResource(resource.id)
  })

  const menuItems = [
    { 
      label: 'Edit resource',
      href: getContentEditUrl(resource),
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