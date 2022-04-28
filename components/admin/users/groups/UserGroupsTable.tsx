import { useContext, useMemo } from "react";
import { ModalContext } from "../../../../context/modalContext";
import useGetUser from "../../../../hooks/users/useGetUser";
import { useRouter } from "../../../../utils/router";
import Button from "../../../Button";
import ItemWithImageTableCell from "../../../common/cells/ItemWithImageTableCell";
import Table from "../../../Table";

const UserGroupsTable = () => {

  const router = useRouter()

  const { id } = router.query

  const { loading, error, user } = useGetUser(id)
  
  const handleAddRole = (id) => {

  }

  const { handleModal } = useContext(ModalContext);
  
  const tableData = useMemo(
    () => {
      return user?.groups.edges.filter(edge => !edge.node._deleted) || []
    }, [user]
  );

  const tableCols = useMemo(() => {
    return [
      {
        Header: "Group",
        accessor: "node.name", // accessor is the "key" in the data
        Cell: ({ cell }) => {
          const cellProps = {
            title: cell.value,
            secondary: JSON.stringify(cell.row.original),
            // href: cell.row.original.id && `${editUrl}?id=${cell.row.original.id}`
          }
          return (
            <ItemWithImageTableCell { ...cellProps } />
          )
        }
      },
      {
        Header: "Roles",
        accessor: "roles",
        
        Cell: ({ cell }) => {
          console.log('cell')
          console.log(cell)
          return (          
            <div className="flex space-x-4">
              {cell.value.map(role => role.name).join(', ')}
            </div>
          )
        }
      },
      {
        width: 300,
        Header: "Actions",

        Cell: ({ cell }) => {
          return (          
            <div className="flex space-x-4">
              <Button
                onClick={() => handleAddRole(cell.row.values.node.id)}
              >Group Role
              </Button>
            </div>
          )
        }
      }
    ]
  }, []);

  return (
    <Table tableData={tableData} tableCols={tableCols} />
  );
}

export default UserGroupsTable