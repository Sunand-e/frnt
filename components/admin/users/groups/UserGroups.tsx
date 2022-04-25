import { useContext, useMemo } from "react";
import { ModalContext } from "../../../../context/modalContext";
import useGetUser from "../../../../hooks/users/useGetUser";
import { useRouter } from "../../../../utils/router";
import Button from "../../../Button";
import BoxContainer from "../../../common/BoxContainer";
import Table from "../../../Table";
import AssignToGroupsModal from "./AssignToGroupsModal";

const UserGroups = () => {

  const router = useRouter()

  const { id } = router.query

  const { loading, error, user } = useGetUser(id)
  
  const handleAddRole = (id) => {

  }

  const { handleModal, closeModal } = useContext(ModalContext);

  const openAssignToGroupsModal = () => {
    handleModal({
      title: `Assign user to groups`,
      content: <AssignToGroupsModal userId={user.id} />
    })
  }
  // Table data is memo-ised due to this:
  // https://github.com/tannerlinsley/react-table/issues/1994
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

  const button = {
    text: "Assign to groups",
    onClick: openAssignToGroupsModal
  }

  return (
    <BoxContainer title="Groups" button={button}>
        <Table tableData={tableData} tableCols={tableCols} />
    </BoxContainer>
  );
}

export default UserGroups