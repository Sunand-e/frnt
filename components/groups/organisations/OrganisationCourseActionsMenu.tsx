import ActionsMenu from "../../common/menus/ActionsMenu"
import { useCallback } from "react"
import useUnenrolUserFromContent from "../../../hooks/contentItems/useUnenrolUserFromContent"
import { gql, useQuery } from "@apollo/client"
import useRemoveProvidedContentFromGroup from "../../../hooks/groups/useRemoveProvidedContentFromGroup"

const OrganisationCourseActionsMenu = ({group, edge}) => {

  const { removeProvidedContentFromGroup } = useRemoveProvidedContentFromGroup()
  
  const handleRemove = useCallback(content => {
    console.log('group')
    console.log(group)
    if(!group?.id) {
      return false
    }
    removeProvidedContentFromGroup({
      groupId: group.id,
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

export default OrganisationCourseActionsMenu