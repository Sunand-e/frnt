import { useCallback } from "react"
import useRemoveAssignedContentFromGroups from "../../hooks/groups/useRemoveAssignedContentFromGroups"
import useRemoveProvisionedContentFromGroups from "../../hooks/groups/useRemoveProvisionedContentFromGroups"
import ActionsMenu from "../common/menus/ActionsMenu"

const  GroupContentActionsMenu = ({group, edge, onRemove, associationType='assigned', typeName='content'}) => {

  const groupTypeName = group.isOrganisation ? 'organisation' : 'group'

  const menuItems = [
    ...(!false ? [{
      label: `Remove ${typeName} from ${groupTypeName}`,
      onClick: () => {
        onRemove(edge.node.id)
      },
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