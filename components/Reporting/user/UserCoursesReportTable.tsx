import { useCallback, useMemo } from "react"
import useGetRoles from "../../../hooks/roles/useGetRoles"
import useGetUser from "../../../hooks/users/useGetUser"
import { useRouter } from "../../../utils/router"
import ItemWithImageTableCell from "../../common/cells/ItemWithImageTableCell"
import Table from "../../Table"

const UserCoursesReportTable = () => {

  const router = useRouter()
  const { user: id } = router.query

  const { loading, error, user } = useGetUser(id)
  
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
            image: course.image?.location
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
          const content = cell.row.original.roles;
          return (
            <pre>
            { JSON.stringify(content,null,2) }
            </pre>
          )
        }
      }
    ]
  }, []);

  return (
    <Table tableData={tableData} tableCols={tableCols} />
  );
}


export default UserCoursesReportTable