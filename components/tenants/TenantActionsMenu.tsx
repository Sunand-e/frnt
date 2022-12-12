import ActionsMenu from "../common/menus/ActionsMenu"
import useDeleteTenant from "../../hooks/tenants/useDeleteTenant"
import useConfirmDelete from "../../hooks/useConfirmDelete"

const TenantActionsMenu = ({tenant}) => {
  
  const editUrl = '/admin/tenants/edit'
  const editHref = tenant?.id && `${editUrl}?id=${tenant.id}`
 
  const { deleteTenant } = useDeleteTenant()
  const { confirmDelete } = useConfirmDelete({
    type: 'tenant',
    name: tenant.name,
    onConfirm: () => deleteTenant(tenant.id)
  })

  const menuItems = [
    { 
      label: 'Edit tenant', 
      href: editHref
    },
    { label: <span className="text-red-500">Delete tenant</span>,
      onClick: confirmDelete
    },
  ]

  return (
    <ActionsMenu
      menuItems={menuItems}
      buttonText={'Actions'}
    />
  )
}

export default TenantActionsMenu