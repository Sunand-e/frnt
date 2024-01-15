import { useMemo } from "react";
import useGetUser from "../../../hooks/users/useGetUser";
import { useRouter } from '../../../utils/router';
import ItemWithImage from "../../common/cells/ItemWithImage";
import Table from "../../common/tables/Table";
import UserPathwayActionsMenu from "./UserPathwayActionsMenu";

const UserPathwaysTable = () => {
  
  const router = useRouter()
  const { id } = router.query

  const { loading, error, user } = useGetUser(id)

  const tableData = useMemo(
    () => {
      return user?.pathways.edges.filter(edge => (
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
        header: "Pathway",
        accessorFn: row => row.node.title, // accessor is the key in the data
        cell: ({ cell }) => {
          const pathway = cell.row.original.node;
          return (
            <ItemWithImage
              title={pathway.title}
              image={pathway.image}
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
            <div className="text-center  line-clamp-2">
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
        cell: ({ cell }) => <UserPathwayActionsMenu user={user} pathway={cell.row.original} />
      },
    ]
  }, []);

  const tableProps = {
    tableData,
    tableCols,
    showTop: false
  }
    
  return (
    <Table { ...tableProps } />
  );
}

export default UserPathwaysTable