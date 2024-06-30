import { useMemo } from "react";
import useGetUser from "../../../hooks/users/useGetUser";
import { useRouter } from '../../../utils/router';
import ItemWithImage from "../../common/cells/ItemWithImage";
import Table from "../../common/tables/Table";
import UserResourceActionsMenu from "./UserResourceActionsMenu";

const UserResourcesTable = ({scrollInTable = false}) => {
  
  const router = useRouter()
  const { id } = router.query

  const { loading, error, user } = useGetUser(id)

  const tableData = useMemo(
    () => {
      return user?.resources.edges.filter(edge => (
        !edge.node._deleted
         && (
          edge.groups.edges.some(edge => edge.roles.length) || 
          edge.roles.length
        )
      )) || []
    },
    [user]
  );

  const tableCols = useMemo(() => {
    return [
      {
        header: "Resource",
        accessorFn: row => row.node.title, // accessor is the key in the data
        cell: ({ cell }) => {
          const resource = cell.row.original.node;
          return (
            <ItemWithImage
              title={resource.title}
              image={resource.image}
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
        cell: ({ cell }) => <UserResourceActionsMenu user={user} resource={cell.row.original} />
      },
    ]
  }, []);

  const tableProps = {
    tableData,
    tableCols,
    scrollInTable,
    showTop: false
  }
    
  return (
    <Table { ...tableProps } />
  );
}

export default UserResourcesTable