import { useMemo } from "react";
import useGetGroup from "../../hooks/groups/useGetGroup";
import {User} from '@styled-icons/fa-solid/User'
import { useRouter } from '../../utils/router';
import ItemWithImage from "../common/cells/ItemWithImage";
import Table from "../common/tables/Table";
import GroupMemberActionsMenu from "./GroupMemberActionsMenu";



const GroupMembersTable = ({
  showRoles=[],
  isSingle=false,
  maxVisibleRows=5
}) => {
  
  const router = useRouter()
  const { id } = router.query

  const { loading, error, group } = useGetGroup(id)
  
  const tableData = useMemo(
    () => group?.users.edges.filter(edge => {
      if(!!edge.node._deleted) return false
      if(showRoles.length > 0 && !edge.roles.some(role => showRoles.includes(role.name))) return false
      return true
    }) || [],
    [group, showRoles]
  );

  const tableCols = useMemo(() => {
    return [
      {
        header: "User ",
        accessorFn: row => row.node.fullName,
        cell: ({ cell }) => {
          const user = cell.row.original.node
          return (
          <ItemWithImage 
            title={user.fullName}
            secondary={user.email}
            // href={cell.row.original.id && `${editUrl}?id=${cell.row.original.id}`}
            imageSrc={user.profileImageUrl}
            icon={<User className="hidden w-auto h-full bg-grey-500 text-main-secondary text-opacity-50" />}
            placeholder={"/images/user-generic.png"}
          />
        )}
      },
      {
        header: "Actions",
        cell: ({ cell }) => <GroupMemberActionsMenu group={group} edge={cell.row.original} />
      },
    ]
  }, [group]);

  const tableProps = {
    tableData: isSingle && tableData.length > 0 ? [tableData[0]] : tableData,
    tableCols,
    scrollInTable: true,
    maxVisibleRows: isSingle ? 1 : maxVisibleRows,
    showTop: false
  }
    
  return (
    <Table { ...tableProps } />
  );
}

export default GroupMembersTable