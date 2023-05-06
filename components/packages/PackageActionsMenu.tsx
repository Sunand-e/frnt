import ActionsMenu from "../common/menus/ActionsMenu"
import useConfirmDelete from "../../hooks/useConfirmDelete"
import useDeleteScormPackage from "../../hooks/scormPackages/useDeleteScormPackage"
import { useContext } from "react"
import PackageInUse from "./PackageInUse"
import { handleModal } from "../../stores/modalStore"

const PackageActionsMenu = ({module, returnFn}) => {
  
  const { deleteScormPackage } = useDeleteScormPackage()

  const handleDelete = async () => {
    const response = await deleteScormPackage(module.id)
    if(response.deleteScormPackage?.success === false) {
      if(response.deleteScormPackage?.usage.length) {
        handleModal({
          size: 'md',
          title: `SCORM module in use`,
          content: <PackageInUse 
            item={module} 
            buttonAction={returnFn}
            usage={response.deleteScormPackage?.usage}
          />
        })
      }
    } else {
      returnFn?.()
    }
  }

  const { confirmDelete } = useConfirmDelete({
    itemType: 'SCORM package',
    name: module.title,
    onConfirm: handleDelete,
    autoClose: false
    // onExit: returnFn
  })

  const menuItems = [
    {
      label: <span className="text-red-500">Delete SCORM package</span>,
      onClick: confirmDelete,
      capability: 'DeleteScormPackage'
    },
    // { title: 'Settings', href:'settings' },
  ]
  return (
    // <ActionsMenu
    //   menuItems={menuItems}
    //   buttonText={'Actions'}
    // />
    <button onClick={(e) => {
        e.stopPropagation()
        confirmDelete()
    }}>Delete SCORM package</button>
  )
}

export default PackageActionsMenu