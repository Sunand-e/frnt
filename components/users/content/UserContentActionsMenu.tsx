import { contentTypes, getContentEditUrl } from "../../common/contentTypes"
import ActionsMenu from "../../common/menus/ActionsMenu"

const UserContentActionsMenu = ({content, onRevoke}) => {

  const type = contentTypes[content.node.itemType]

  const menuItems = [
    ...(!content.groups?.edges.length ? [{
      label: `Revoke access to ${type.name}`,
      onClick: () => onRevoke([content.node.id]),
      capability: 'EnrolUsersInContent'
    }]:[]),
    { 
      label: `Edit ${type.name}`,
      href: getContentEditUrl(content.node),
      capability: type.updateCapability
    },
  ]
  return (
    <ActionsMenu
      menuItems={menuItems}
      buttonText={'Actions'}
    />
  )
}

export default UserContentActionsMenu