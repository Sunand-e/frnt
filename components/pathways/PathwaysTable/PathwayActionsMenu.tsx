import ActionsMenu from "../../common/menus/ActionsMenu"
import useDeletePathway from "../../../hooks/pathways/useDeletePathway"
import useConfirmDelete from "../../../hooks/useConfirmDelete"

const PathwayActionsMenu = ({content: pathway}) => {
  const editUrl = '/admin/pathways/edit'
  const editHref = pathway?.id && `${editUrl}?pid=${pathway.id}`
  
  const { deletePathway } = useDeletePathway()
  const { confirmDelete } = useConfirmDelete({
    itemType: 'pathway',
    name: pathway.title,
    onConfirm: () => deletePathway(pathway.id)
  })

  const menuItems = [
    { 
      label: 'Edit pathway',
      href: editHref,
      capability: 'UpdatePathway'
    },
    {
      label: <span className="text-red-500">Delete pathway</span>,
      onClick: confirmDelete,
      capability: 'DeletePathway'
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

export default PathwayActionsMenu