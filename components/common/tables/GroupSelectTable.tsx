import { useMemo } from "react";
import { Group, Tag, User } from "../../../graphql/generated";
import useGetGroupsDetailed from "../../../hooks/groups/useGetGroupsDetailed";
import useGetCurrentUser from "../../../hooks/users/useGetCurrentUser";
import useUserHasCapability from "../../../hooks/users/useUserHasCapability";
import Button from "../Button";
import ItemWithImage from "../cells/ItemWithImage";
import { getGroupType, groupTypes } from "../groupTypes";
import useGetThumbnail from "../items/useGetThumbnail";
import Table from "./Table";


type GroupSelectTableProps = {
  recipient: Tag | Group | User
  selectedGroupIds: string[]
  actionName: string
  typeName?: string
  rowSizing?: 'sm' | 'md' | 'lg'
  groupFilter: (groups: any) => boolean
  filters?: string[]
  onSubmit: (groupIds: string[]) => void
  onRowSelect: (selectedIds: string[]) => void
}

const GroupSelectTable = ({ 
  typeName = 'group',
  selectedGroupIds,
  rowSizing='sm',
  groupFilter,
  filters=['global'],
  recipient,
  actionName,
  onRowSelect,
  onSubmit
}: GroupSelectTableProps) => {

  const { userHasCapability } = useUserHasCapability()
  const { groups, loading: groupsLoading } = useGetGroupsDetailed()
  
  const type = groupTypes[typeName];

  let availableGroupNodes = []

  if (userHasCapability('AddUsersToGroups', 'tenant')) {
    availableGroupNodes = groups?.edges.map(edge => edge.node).filter(group => {
      return getGroupType(group).name === typeName
    }) || []
  } else {
    // This will change when subgroups are implemented:
    availableGroupNodes = []
  }
  
  const actionNameCapitalised = actionName.charAt(0).toUpperCase() + actionName.slice(1)
  
  const availableGroups = availableGroupNodes?.filter(groupFilter) || []

  let recipientLabel
  
  switch (recipient.__typename) {
    case 'Tag':
      recipientLabel = recipient.label
      break;
    case 'Group':
      recipientLabel = recipient.name
      break;
    case 'User':
      recipientLabel = recipient.fullName
      break;
  }

  const tableData = useMemo(() => availableGroups, [availableGroups]);

  const iconPaddingOptions = {
    sm: 'p-1.2',
    md: 'p-1.5',
    lg: 'p-1.8',
  };

  const iconPadding = iconPaddingOptions[rowSizing] || iconPaddingOptions.md;

  const tableCols = useMemo(() => [
    {
      header: type.label,
      accessorFn: row => row.name,

      cell: ({ cell }) => {
        const { src } = useGetThumbnail(cell.row.original, 50)
        let icon = <type.icon className={iconPadding} />
        let rounded = 'full'
        const cellProps = {
          image: cell.row.original.image,
          imageSrc: src,
          icon,
          rounded,
          title: cell.getValue(),
        }


        return (
        <ItemWithImage { ...cellProps } />
        )
      }
    },
  ], []);

  let buttonLabel = `No ${type.plural} selected`

  if(selectedGroupIds.length) {
    const groupTypeStringWithCount = 'some groups'
    buttonLabel = `${actionNameCapitalised} ${groupTypeStringWithCount} to ${recipientLabel}`
  }

  return (
    <>
      <Table
        tableData={tableData}
        tableCols={tableCols}
        filters={filters}
        scrollInTable={true}
        maxVisibleRows={9}
        selectedRowIds={selectedGroupIds}
        isSelectable={true}
        onRowSelect={onRowSelect}
        rowSizing={rowSizing}
      />
      <Button
        disabled={!selectedGroupIds.length}
        className="mt-4 -mb-4" onClick={() => onSubmit(selectedGroupIds)}
      >
        {buttonLabel}
      </Button>
    </>
  );
}

GroupSelectTable.whyDidYouRender = true

export default GroupSelectTable