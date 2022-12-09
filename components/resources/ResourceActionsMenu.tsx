import { useContext } from "react"
import ActionsMenu from "../common/menus/ActionsMenu"
import { ModalContext } from "../../context/modalContext"
import DeleteResourceModal from "./DeleteResourceModal"

const ResourceActionsMenu = ({resource}) => {
  const { handleModal } = useContext(ModalContext)
  const editUrl = '/admin/resources/edit'
  const editHref = resource?.id && `${editUrl}?id=${resource.id}`
  
  const handleDeleteClick = () => {
    handleModal({
      title: `Delete resource`,
      content: <DeleteResourceModal resourceId={resource?.id} />
    })
  }
  const menuItems = [
    { label: 'Edit resource', href: editHref },
    { label: <span className="text-red-500">Delete resource</span>, onClick: handleDeleteClick },
    // { title: 'Settings', href:'settings' },
  ]
  return (
    <ActionsMenu
      menuItems={menuItems}
      buttonText={'Actions'}
    />
  )
}

export default ResourceActionsMenu