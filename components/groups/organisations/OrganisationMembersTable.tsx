import { useMemo } from "react";
import useGetGroup from "../../../hooks/groups/useGetGroup";
import {User} from '@styled-icons/fa-solid/User'
import { useRouter } from '../../../utils/router';
import ItemWithImage from "../../common/cells/ItemWithImage";
import Table from "../../common/tables/Table";
import OrganisationMemberActionsMenu from "./OrganisationMemberActionsMenu";

const OrganisationMembersTable = () => {
  
  const router = useRouter()
  const { id } = router.query

  const { loading, error, group } = useGetGroup(id)
  
  const tableData = useMemo(
    () => {
      return group?.users.edges.filter(edge => (
        !edge.node._deleted
      )) || []
    },
    [group]
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
        cell: ({ cell }) => <OrganisationMemberActionsMenu group={group} edge={cell.row.original} />
      },
    ]
  }, [group]);

  const tableProps = {
    tableData,
    tableCols,
    scrollInTable: true,
    maxVisibleRows: 5,
    showTop: false
  }
    
  return (
    <Table { ...tableProps } />
  );
}

export default OrganisationMembersTable