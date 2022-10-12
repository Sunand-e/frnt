import { useCallback, useMemo } from "react"
import useGetUser from "../../../hooks/users/useGetUser"
import { useRouter } from "../../../utils/router"
import ButtonLink from "../../common/ButtonLink"
import ItemWithImage from "../../common/cells/ItemWithImage"
import Table from "../../common/Table"

import LoadingSpinner from '../../common/LoadingSpinner';
import { Dot } from '../../common/misc/Dot';
import dayjs from 'dayjs';
var advancedFormat = require('dayjs/plugin/advancedFormat')
dayjs.extend(advancedFormat)

const UserCoursesReportTable = () => {

  const router = useRouter()
  const { user: userId } = router.query

  const { loading, error, user } = useGetUser(userId)
  
  // Table data is memo-ised due to this:
  // https://github.com/tannerlinsley/react-table/issues/1994
  
  const noDataDash = <span>&mdash;</span>

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
            <ItemWithImage { ...cellProps } />
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
        Header: "Course status",
        accessor: "status",
        Cell: ({ cell }) => {
          return cell.value
        }
      },
      {
        Header: "Score",
        accessor: "score",
        Cell: ({ cell }) => {
          return cell.value
        }
      },
      {
        Header: "First access",
        accessor: "createdAt",
        Cell: ({ cell }) => {
          return cell.value ? dayjs(cell.value).format('Do MMMM YYYY [at] h:mm A') : noDataDash
        }
      },

      {
        Header: "Last visited",
        accessor: "updatedAt",
        Cell: ({ cell }) => {
          return cell.value ? dayjs(cell.value).format('Do MMMM YYYY [at] h:mm A') : noDataDash
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
    <>
      { loading && <LoadingSpinner text={(
        <>
          Loading user's courses
          <Dot>.</Dot>
          <Dot>.</Dot>
          <Dot>.</Dot>
        </>
      )} /> }
      { error && (
        <p>Unable to fetch user's courses.</p>
      )}
      { (!loading && !error) && (
        <Table tableData={tableData} tableCols={tableCols} />
      )}
    </>
  );
}


export default UserCoursesReportTable