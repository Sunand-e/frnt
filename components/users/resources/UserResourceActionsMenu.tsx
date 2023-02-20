import ActionsMenu from "../../common/menus/ActionsMenu"
import { useCallback } from "react"
import useUnenrolUserFromContent from "../../../hooks/contentItems/useUnenrolUserFromContent"

const UserResourceActionsMenu = ({user, resource}) => {

  const reportsUrl = '/admin/resources/edit'
  
  
  // const {enrolUsersInContent} = useEnrolUsersInContent()

  // const handleChangeRole = useCallback((content, role) => {
  //   if(!user?.id) {
  //     return false
  //   }
  //   enrolUsersInContent({
  //     userIds: [user.id],
  //     contentItemIds: [content.node.id],
  //     roleId: role.id
  //   })
  // }, [user])
  
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
    // { title: 'Settings', href:'settings' },
  ]
  return (
    <ActionsMenu
      menuItems={menuItems}
      buttonText={'Actions'}
    />
  )
}

export default UserResourceActionsMenu