import { useMemo } from "react";
import useGetUser from "../../../hooks/users/useGetUser";
import { useRouter } from '../../../utils/router';
import ItemWithImage from "../../common/cells/ItemWithImage";
import Table from "../../common/tables/Table";
import UserContentActionsMenu from "../content/UserContentActionsMenu";
import { contentTypes } from "../../common/contentTypes";

interface UserContentTableProps {
  contentType: string;
  scrollInTable?: boolean;
}

const UserContentTable = ({ contentType }: UserContentTableProps) => {
  const router = useRouter();
  const { id } = router.query;

  const { loading, error, user } = useGetUser(id);

  const type = contentTypes[contentType];

  const tableData = useMemo(
    () => {
      return user?.[type.pluralKey].edges.filter(edge => (
        !edge.node._deleted
         && (
          edge.groups.edges.some(edge => edge.roles.length) || 
          edge.roles.length
        )
      )) || []
    },
    [user, type.pluralKey]
  );

  const tableCols = useMemo(() => {
    return [
      {
        header: type.label,
        accessorFn: row => row.node.title,
        cell: ({ cell }) => {
          const item = cell.row.original.node;
          return (
            <ItemWithImage
              title={item.title}
              image={item.image}
            />
          )
        }
      },
      {
        id: "AssignmentStatus",
        header: "Status",
        cell: ({ cell }) => {
          const values = cell.row.original;
          return (
            <div className="text-center line-clamp-2">
              { cell.row.original.groups.edges.length ? (
                <>
                  Assigned via group:
                  <strong> {cell.row.original.groups.edges.map(edge => edge.node.name).join(', ')}
                  </strong>
                </>
              ) : (
                'Assigned'
              )}
            </div>
          )
        }
      },
      {
        header: "Actions",
        accessorKey: "actions",
        cell: ({ cell }) => <UserContentActionsMenu user={user} content={cell.row.original} />
      },
    ]
  }, [type.label]);

  const tableProps = {
    tableData,
    tableCols,
    scrollInTable: true,
    showTop: false
  }
    
  return (
    <Table { ...tableProps } />
  );
}

export default UserContentTable;