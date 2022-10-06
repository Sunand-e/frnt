import { useCallback, useMemo } from "react"
import useGetUser from "../../../hooks/users/useGetUser"
import { useRouter } from "../../../utils/router"
import ButtonLink from "../../ButtonLink"
import ItemWithImageTableCell from "../../common/cells/ItemWithImageTableCell"
import Table from "../../Table"

const UserCoursesReportTable = () => {

  const router = useRouter()
  const { user: userId } = router.query

  const { loading, error, user } = useGetUser(userId)
  
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
            image: course.image,
            // secondary: JSON.stringify(cell.row.original),
            href: course.id && {
              query: {
                course: course.id,
                user: userId
              }
            }
          }
          return (
            <ItemWithImageTableCell { ...cellProps } />
          )
        }
      },
      {
        Header: "Role",
        Cell: ({ cell }) => {
          const content = cell.row.original.node.roles;
          return (
            <pre>
            { JSON.stringify(content,null,2) }
            </pre>
          )
        }
      },
      {
        width: 300,
        Header: "Actions",
        // className: 'text-center',
        Cell: ({ cell }) => {
          const course = cell.row.original.node;
          const href = {
            query: {
              ...(course.id && {course: course.id}),
              user: userId
            }
          }
          return (          
            <div className="space-x-4">
              <ButtonLink href={href}>See details</ButtonLink>
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


export default UserCoursesReportTable