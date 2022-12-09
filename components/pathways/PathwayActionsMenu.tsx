import { useContext } from "react"
import ActionsMenu from "../common/menus/ActionsMenu"
import { ModalContext } from "../../context/modalContext"
import DeletePathwayModal from "./DeletePathwayModal"

const PathwayActionsMenu = ({pathway}) => {
  const { handleModal } = useContext(ModalContext)
  const editUrl = '/admin/pathways/edit'
  const editHref = pathway?.id && `${editUrl}?id=${pathway.id}`
  
  const handleDeleteClick = () => {
    handleModal({
      title: `Delete pathway`,
      content: <DeletePathwayModal pathwayId={pathway?.id} />
    })
  }

  const menuItems = [
    { label: 'Edit pathway', href: editHref },
    { label: <span className="text-red-500">Delete pathway</span>, onClick: handleDeleteClick },
    // { title: 'Settings', href:'settings' },
  ]
  return (
    <ActionsMenu
      menuItems={menuItems}
      buttonText={'Actions'}
      editUrl={true}
    />
  )
}

export default PathwayActionsMenu