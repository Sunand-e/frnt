import ActionsMenu from "../menus/ActionsMenu";

const BulkActionsMenu = ({bulkActions}) => {
  
  return (
    <ActionsMenu
      align='left'
      menuItems={bulkActions}
      buttonText={'Bulk actions'}
    />
  )
}

export default BulkActionsMenu