import ActionsMenu from "../../common/menus/ActionsMenu"
import { useCallback } from "react"
import useUnenrolUserFromContent from "../../../hooks/contentItems/useUnenrolUserFromContent"

const UserPathwayActionsMenu = ({user, pathway}) => {

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
    ...(!pathway.groups.edges.length ? [{
      label: 'Revoke access to pathway',
      onClick: () => {
        handleUnenrol(
          pathway,
          null,
        )
      },
      capability: 'EnrolUsersInContent'
    }]:[]),
    // { title: 'Settings', href:'settings' },
  ]
  return (
    <ActionsMenu
      menuItems={menuItems}
      buttonText={'Actions'}
    />
  )
}

export default UserPathwayActionsMenu