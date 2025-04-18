
import ActionsMenu from "../common/menus/ActionsMenu"
import useConfirmDelete from "../../hooks/useConfirmDelete"

const  GroupContentActionsMenu = ({group, edge, onRemove, typeName='content'}) => {

  const groupTypeName = group.isOrganisation ? 'organisation' : 'group'

  const { confirmDelete } = useConfirmDelete({
    itemType: typeName,
    name: group.title,
    displayActionText:'Remove',
    onConfirm: () => onRemove(edge.node.id)
  })

  const menuItems = [
    ...(!false ? [{
      label: `Remove ${typeName} from ${groupTypeName}`,
      onClick: () => confirmDelete(),
      capability: 'EnrolUsersInContent'
    }]:[]),
  ]
  return (
    <ActionsMenu
      menuItems={menuItems}
      buttonText={'Actions'}
    />
  )
}

export default GroupContentActionsMenu