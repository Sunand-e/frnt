import ActionsMenu from "../menus/ActionsMenu";
import { useTableContext } from "./tableContext";

const BulkActionsMenu = () => {

  const bulkActions = useTableContext(s => s.bulkActions)
  const menuItems = bulkActions?.map(action => ({
    ...action,
    onClick: () => action()
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