import { useCallback } from "react"
import useRemoveProvisionedContentFromGroups from "../../../hooks/groups/useRemoveProvisionedContentFromGroups"
import ActionsMenu from "../../common/menus/ActionsMenu"

const OrganisationContentActionsMenu = ({group, edge}) => {

  const { removeProvisionedContentFromGroups } = useRemoveProvisionedContentFromGroups()
  
  const handleRemove = useCallback(content => {
    if(!group?.id) {
      return false
    }
    removeProvisionedContentFromGroups({
      groupIds: [group.id],
      contentItemIds: [content.node.id],
    })
  }, [group])

  const menuItems = [
    ...(!false ? [{
      label: 'Remove course from organisation',
      onClick: () => {
        handleRemove(
          edge
        )
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