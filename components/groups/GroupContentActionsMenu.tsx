import { useCallback } from "react"
import useRemoveAssignedContentFromGroups from "../../hooks/groups/useRemoveAssignedContentFromGroups"
import useRemoveProvisionedContentFromGroups from "../../hooks/groups/useRemoveProvisionedContentFromGroups"
import ActionsMenu from "../common/menus/ActionsMenu"

const GroupContentActionsMenu = ({group, edge, associationType='assigned', typeName='content'}) => {

  const { removeProvisionedContentFromGroups } = useRemoveProvisionedContentFromGroups()
  const { removeAssignedContentFromGroups } = useRemoveAssignedContentFromGroups()
  
  const handleRemove = useCallback(() => {
    if(!group?.id) {
      return false
    }
    if(associationType === 'assigned') {
      removeAssignedContentFromGroups({
        groupIds: [group.id],
        contentItemIds: [edge.node.id],
      })
    } else if(associationType === 'provided') {
      removeProvisionedContentFromGroups({
        groupIds: [group.id],
        contentItemIds: [edge.node.id],
      })
    }
  }, [group, edge])

  const menuItems = [
    ...(!false ? [{
      label: `Remove ${typeName} from group`,
      onClick: () => {
        handleRemove()
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