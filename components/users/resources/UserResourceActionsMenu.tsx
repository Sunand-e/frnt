import ActionsMenu from "../../common/menus/ActionsMenu"
import { useCallback } from "react"
import useUnenrolUserFromContent from "../../../hooks/contentItems/useUnenrolUserFromContent"

const UserResourceActionsMenu = ({user, resource}) => {
  
  const { unenrolUserFromContent } = useUnenrolUserFromContent()
  
  const handleUnenrol = useCallback((content, role) => {
    if(!user?.id) {
      return false
    }
    unenrolUserFromContent({
      userId: user.id,
      contentItemId: content.node.id,
    })
  }, [user])
  
  const menuItems = [
    ...(!resource.groups.edges.length ? [{
      label: 'Revoke access to resource',
      onClick: () => {
        handleUnenrol(
          resource,
          null,
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

export default UserResourceActionsMenu