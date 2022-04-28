import { useContext, useMemo } from "react";
import { ModalContext } from "../../../../context/modalContext";
import useGetUser from "../../../../hooks/users/useGetUser";
import BoxContainer from "../../../common/containers/BoxContainer";
import Table from "../../../Table";
import { useRouter } from '../../../../utils/router';
import Button from "../../../Button";

const UserCoursesTable = () => {
  
  const router = useRouter()
  const { id } = router.query

  const { loading, error, user } = useGetUser(id)
  
  const handleAddRole = (id) => {
  }

  // Table data is memo-ised due to this:
  // https://github.com/tannerlinsley/react-table/issues/1994
  const tableData = useMemo(
    () => {
      return user?.courses.edges.filter(edge => !edge.node._deleted) || []
    },
    [user]
  );
  
  const tableCols = useMemo(() => {
    return [
      {
        Header: "Course",
        accessor: "node.title", // accessor is the "key" in the data
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
              >Course Role
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

export default UserCoursesTable