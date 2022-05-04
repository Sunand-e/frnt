import { useCallback, useContext, useMemo } from "react";
import useGetUser from "../../../../hooks/users/useGetUser";
import Table from "../../../Table";
import { useRouter } from '../../../../utils/router';
import Button from "../../../Button";
import ItemWithImageTableCell from "../../../common/cells/ItemWithImageTableCell";
import useGetRoles from "../../../../hooks/roles/useGetRoles";
import Select from "react-select";
import UserRoleSelectCell from "../groups/UserRoleSelectCell";

const UserCoursesTable = () => {
  
  const router = useRouter()
  const { id } = router.query

  const { loading, error, user } = useGetUser(id)
  const { loading: rolesLoading, error: rolesError, roles } = useGetRoles()

  const handleChangeRole = useCallback((content, role) => {
    if(!user?.id) {
      return false
    }
    enrolUsersInContent({
      userIds: [user.id],
      groupIds: [content.node.id],
      roleId: role.id
    })
  }, [user])

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
        Cell: ({ cell }) => {
          const course = cell.row.original.node;
          const cellProps = {
            title: course.title,
            image: course.image.location
            // secondary: JSON.stringify(cell.row.original),
            // href: cell.row.original.id && `${editUrl}?id=${cell.row.original.id}`
          }
          return (
            <ItemWithImageTableCell { ...cellProps } />
          )
        }
      },
      {
        Header: "Role",
        Cell: ({ cell }) => {
          const content = cell.row.original;
          const handleChange = role => handleChangeRole(content, role);
          return (
            <UserRoleSelectCell onChange={handleChange} cell={cell} roleType={'content_item_role'} />
          )
        }
      },
      {
        width: 300,
        Header: "Actions",

        Cell: ({ cell }) => {
          const content = cell.row.original;
          return <a className="text-red-600 hover:text-red-800" href="#" onClick={() => {
            handleChangeRole(
              content,
              null,
            )
          }}>Unenrol from course</a>
        }
      }
    ]
  }, []);

  return (
    <Table tableData={tableData} tableCols={tableCols} />
  );
}

export default UserCoursesTable