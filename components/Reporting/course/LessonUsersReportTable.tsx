import React, { useContext, useMemo, useState } from 'react';
import Table from '../../Table';
import ButtonLink from '../../ButtonLink';
import ItemWithImageTableCell from '../../common/cells/ItemWithImageTableCell';
import { ModalContext } from '../../../context/modalContext';
import { gql, useQuery } from '@apollo/client';
import { useRouter } from '../../../utils/router';
import dayjs from 'dayjs';
var advancedFormat = require('dayjs/plugin/advancedFormat')

const LessonUsersReportTable = () => {

  const router = useRouter()

  const { lesson: lessonId, course: courseId } = router.query

  const { loading, error, data } = useQuery(gql`
    query getLessonsUsers($lessonId: ID!) {
      lesson(id: $lessonId) {
        users {
          edges {
            node {
              id
              fullName
              email
            }
            status
            lastVisited
            firstVisited
            createdAt
            updatedAt
            score
            visits
            completed
          }
          totalCount
        }
      }
    }
  `, {
    variables: {
      lessonId
    }
  })

  // Table data is memo-ised due to this:
  // https://github.com/tannerlinsley/react-table/issues/1994
  const tableData = useMemo(() => {
    const users = data?.lesson?.users.edges
    return users || []
  }, [data]);

  const tableCols = useMemo(
    () => [
      {
        Header: "Name",
        Cell: ({ cell }) => {
          const user = cell.row.original.node
          const cellProps = {
            title: user.fullName,
            secondary: user.email,
            // href: {
            //   query: {
            //     lesson: lessonId,
            //     ...(user.id && { user: user.id } )
            //   }
            // }
          }
          return (
            <ItemWithImageTableCell placeholder="/images/user-generic.png" { ...cellProps } />
          )
        }
      },
      // {
      //   Header: "JSON",
      //   Cell: ({ cell }) => (
      //     <pre className='text-left'>
      //       {JSON.stringify(cell.row.original,null,2)}
      //     </pre>
      //   ),
      //   className: 'text-left'
      // },
      {
        Header: "lesson status",
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
          return dayjs(cell.value).format('MMMM Do, YYYY [at] h:mm A')
        }
      },

      {
        Header: "Last visited",
        accessor: "updatedAt",
        Cell: ({ cell }) => {
          return dayjs(cell.value).format('MMMM Do, YYYY [at] h:mm A')
        }
      },
      {
        id: "completedAt",
        Header: "Completed at",
        accessor: "updatedAt",
        Cell: ({ cell }) => {
          return <span>&mdash;</span>
          return dayjs(cell.value).format('MMMM Do, YYYY [at] h:mm A')
        }
      },

      // "visits": null,
      // "completed": null
      // {
      //   Header: "Roles",
      //   accessor: "roles[0].name", // accessor is the "key" in the data
      //   Cell: ({ cell }) => {
      //     return cell.row.original.roles.map(role => {
      //       return role.name
      //     }).join(', ')
      //   }
      // },
      {
        id: "actions",
        width: 300,
        Header: '',
        Cell: ({ cell }) => {
          const userId = cell.row.original.node.id
          const href = {
            query: {
              lesson: lessonId,
              course: courseId,
              ...( userId && { user: userId } )
            }
          }

          return (
            <div className="flex space-x-4 justify-center">
              {/* <ButtonLink href={href}>See details</ButtonLink> */}
            </div>
          )
        }
      }
    ],
    []
  );

  return (
    <>
      <Table tableData={tableData} tableCols={tableCols} />
    </>
  );
}

export default LessonUsersReportTable