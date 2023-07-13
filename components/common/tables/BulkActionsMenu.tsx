import ActionsMenu from "../menus/ActionsMenu";
import { useTableContext } from "./tableContext";

const BulkActionsMenu = () => {

  const bulkActions = useTableContext(s => s.bulkActions)
  const selectedRowIds = useTableContext(s => s.selectedRowIds)

  const menuItems = bulkActions?.map(action => ({
    ...action,
    onClick: () => action.onClick(selectedRowIds)
  }))
  return bulkActions.length ? (
    <ActionsMenu
      align='left'
      menuItems={menuItems}
      buttonText={'Bulk actions'}
    />
  ) : <></>
}

export default BulkActionsMenu