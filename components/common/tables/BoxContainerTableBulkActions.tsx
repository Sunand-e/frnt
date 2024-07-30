import Button from "../Button";
import BulkActionsMenu from "./BulkActionsMenu";
import { useTableContext } from "./tableContext";

const BoxContainerTableBulkActions = () => {

  const bulkActions = useTableContext(s => s.bulkActions)
  const selectedRowIds = useTableContext(s => s.selectedRowIds)
  const setRowSelection = useTableContext(s => s.setRowSelection)

  const handleBulkAction = () => {
    bulkActions[0].onClick(selectedRowIds)
    setRowSelection({})
  }

  if(selectedRowIds.length === 0) return null

  if(bulkActions.length > 1) {
    return <BulkActionsMenu />
  } else if(bulkActions.length === 1) {
    return (
      <Button onClick={handleBulkAction} disabled={false} displayType="white">
        {bulkActions[0].label}
      </Button>
    )
  }
  return null
}

export default BoxContainerTableBulkActions;