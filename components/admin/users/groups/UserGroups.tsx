import Link from "next/link";
import { useMemo } from "react";
import useGetUser from "../../../../hooks/users/useGetUser";
import { useRouter } from "../../../../utils/router";
import Button from "../../../Button";
import BoxContainer from "../../../common/BoxContainer";
import Table from "../../../Table";

const UserGroups = () => {

  const router = useRouter()

  const { id } = router.query

  const { loading, error, user } = useGetUser(id)
  
  const handleAddRole = (id) => {
  }

  // Table data is memo-ised due to this:
  // https://github.com/tannerlinsley/react-table/issues/1994
  const tableData = useMemo(
    () => {
      alert(JSON.stringify(user,null,2))
      return user?.groups.edges.map(edge => edge.node).filter(item => !item._deleted) || []
    }, [user]
  );

  const tableCols = useMemo(() => {
    return [
      {
        Header: "Group",
        accessor: "name", // accessor is the "key" in the data
      },
      {
        Header: "Role",
        accessor: "role",
      },
      {
        width: 300,
        Header: "Actions",
        Cell: ({ cell }) => {
          const href = cell.row.values.id && `${editUrl}?id=${cell.row.values.id}`

          return (          
            <div className="flex space-x-4">
              <Button
                onClick={() => handleAddRole(cell.row.values.id)}
              >Group Role
              </Button>
            </div>
          )
        }
      }
    ]
  }, []);



  return (
    <BoxContainer title="User Groups" >
        <Button onClick={() => {}}>Assign to groups</Button>
        <Table tableData={tableData} tableCols={tableCols} />
    </BoxContainer>
  );
}

export default UserGroups