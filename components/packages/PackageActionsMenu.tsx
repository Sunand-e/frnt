import ActionsMenu from "../common/menus/ActionsMenu"
import useConfirmDelete from "../../hooks/useConfirmDelete"
import useDeleteScormModule from "../../hooks/scormModules/useDeleteScormModule"
import { useContext } from "react"
import PackageInUse from "./PackageInUse"
import { handleModal } from "../../stores/modalStore"

const PackageActionsMenu = ({module, returnFn}) => {
  
  const { deleteScormModule } = useDeleteScormModule()

  const handleDelete = async () => {
    const response = await deleteScormModule(module.id)
    if(response.deleteScormModule?.success === false) {
      if(response.deleteScormModule?.usage.length) {
        handleModal({
          size: 'md',
          title: `SCORM module in use`,
          content: <PackageInUse 
            item={module} 
            buttonAction={returnFn}
            usage={response.deleteScormModule?.usage}
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
      capability: 'DeleteScormModule'
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