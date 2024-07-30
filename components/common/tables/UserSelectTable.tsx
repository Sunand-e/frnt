import { useMemo } from "react";
import { Group } from "../../../graphql/generated";
import useGetUsers from "../../../hooks/users/useGetUsers";
import classNames from "../../../utils/classNames";
import {User} from '@styled-icons/fa-solid/User'
import Button from "../Button";
import ItemWithImage from "../cells/ItemWithImage";
import Table from "./Table";

type UserSelectTableProps = {
  recipientType: string
  recipient: Group
  selectedUserIds: string[]
  actionName: string
  rowSizing?: 'sm' | 'md' | 'lg'
  userFilter: (user: any) => boolean
  filters?: string[]
  onSubmit: (userIds: string[]) => void
  onRowSelect: (selectedIds: string[]) => void
}

const UserSelectTable = ({ 
  selectedUserIds,
  rowSizing='sm',
  userFilter,
  filters=['global'],
  recipient,
  recipientType,
  actionName,
  onRowSelect,
  onSubmit
}: UserSelectTableProps) => {

  const { users, loading, error } = useGetUsers()
  
  const userNodes = users?.edges.map(edge => edge.node)
  const availableUsers = userNodes?.filter(userFilter) || []
  
  const actionNameCapitalised = actionName.charAt(0).toUpperCase() + actionName.slice(1)

  let recipientLabel

  switch (recipient.__typename) {
    case 'Group':
      recipientLabel = recipient.name
      break;
  }

  const tableData = useMemo(() => availableUsers, [availableUsers]);

  const iconPaddingOptions = {
    sm: 'p-1.2',
    md: 'p-1.5',
    lg: 'p-1.8',
  };

  const iconPadding = iconPaddingOptions[rowSizing] || iconPaddingOptions.md;

  const tableCols = useMemo(() => [
    {
      header: "User",
      accessorFn: row => row.fullName,

      cell: ({ cell }) => (
        <ItemWithImage 
          title={cell.row.original.fullName}
          imageSrc={cell.row.original.profileImageUrl}
          icon={<User className={classNames(
            iconPadding,
            'hidden w-auto h-full bg-grey-500 text-main-secondary text-opacity-50'
          )} />}
          placeholder={"/images/user-generic.png"}
        />
      )
    },
    {
      header: "Email",
      accessorFn: row => row.email,
    }
  ], []);

  let buttonLabel = `No users selected`

  if(selectedUserIds.length) {
    const userStringWithCount = `${selectedUserIds.length} ${selectedUserIds.length === 1 ? 'user' : 'users'}`
    buttonLabel = `${actionNameCapitalised} ${userStringWithCount} to ${recipientLabel}`
  }

  return (
    <>
      <Table
        tableData={tableData}
        tableCols={tableCols}
        filters={filters}
        scrollInTable={true}
        maxVisibleRows={9}
        selectedRowIds={selectedUserIds}
        isSelectable={true}
        onRowSelect={onRowSelect}
        rowSizing={rowSizing}
      />
      <Button
        disabled={!selectedUserIds.length}
        className="mt-4 -mb-4" onClick={() => onSubmit(selectedUserIds)}
      >
        {buttonLabel}
      </Button>
    </>
  );
}

export default UserSelectTable