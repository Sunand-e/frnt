import ActionsMenu from "../../common/menus/ActionsMenu"
import { useCallback } from "react"
import useRemoveUserFromGroup from "../../../hooks/groups/useRemoveUserFromGroup"

const OrganisationMemberActionsMenu = ({group, edge}) => {

  const { removeUserFromGroup } = useRemoveUserFromGroup()
  
  const handleRemove = useCallback(user => {
    if(!group?.id) {
      return false
    }
    removeUserFromGroup({
      groupId: group.id,
      userId: user.node.id,
    })
  }, [group])

  const menuItems = [
    ...(!false ? [{
      label: 'Remove user from organisation',
      onClick: () => {
        handleRemove(
          edge
        )
      },
      capability: 'RemoveUserFromGroup'
    }]:[]),
  ]
  return (
    <ActionsMenu
      menuItems={menuItems}
      buttonText={'Actions'}
    />
  )
}

export default OrganisationMemberActionsMenu