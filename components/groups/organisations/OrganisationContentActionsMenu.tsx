import { useCallback } from "react"
import useRemoveProvisionedContentFromGroups from "../../../hooks/groups/useRemoveProvisionedContentFromGroups"
import ActionsMenu from "../../common/menus/ActionsMenu"

const OrganisationContentActionsMenu = ({group, edge, typeName='content'}) => {

  const { removeProvisionedContentFromGroups } = useRemoveProvisionedContentFromGroups()
  
  const handleRemove = useCallback(() => {
    if(!group?.id) {
      return false
    }
    removeProvisionedContentFromGroups({
      groupIds: [group.id],
      contentItemIds: [edge.node.id],
    })
  }, [group, edge])

  const menuItems = [
    ...(!false ? [{
      label: `Remove ${typeName} from organisation`,
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

export default OrganisationContentActionsMenu