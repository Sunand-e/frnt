import ActionsMenu from "../../common/menus/ActionsMenu"
import { useCallback } from "react"
import useUnenrolUserFromContent from "../../../hooks/contentItems/useUnenrolUserFromContent"

const UserCourseActionsMenu = ({user, course}) => {

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
    ...(!course.groups.edges.length ? [{
      label: 'Unenrol user from course',
      onClick: () => {
        handleUnenrol(
          course,
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

export default UserCourseActionsMenu