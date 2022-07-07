import { gql, useQuery } from '@apollo/client';
import React, { useContext, useMemo } from 'react';
import Table from '../../Table';
import ButtonLink from '../../ButtonLink';
import { ModalContext } from '../../../context/modalContext';
import ItemWithImageTableCell from '../../common/cells/ItemWithImageTableCell';
import useGetCourseUsers from '../../../hooks/courses/useGetCourseUsers';
import { useRouter } from '../../../utils/router';

const UserLessonsReportTable = () => {

  const router = useRouter()

  const { user: userId, course: courseId } = router.query

  const { loading, error, data } = useQuery(gql`
    query getUsersLessons($userId: ID! $where: JSON) {
      user(id: $userId) {
        lessons(where: $where) {
          edges {
            node {
              id
              title
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
      userId,
      where: { courseId }
    }
  })

  // Table data is memo-ised due to this:
  // https://github.com/tannerlinsley/react-table/issues/1994
  const tableData = useMemo(() => {
    const lessons = data?.user?.lessons.edges
    return lessons || []
  }, [data]);

  const tableCols = useMemo(
    () => [
      {
        Header: "Lesson",
        Cell: ({ cell }) => {
          const cellProps = {
            title: cell.row.original.node.title,
            // secondary: cell.row.original.email,
            href: cell.row.original.node.id && {
              query: {
                user: userId,
                course: courseId,
                lesson: cell.row.original.node.id
              }
            }
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
        Header: "First access",
        accessor: "createdAt",
        Cell: ({ cell }) => {
          return cell.value
        }
      },

      {
        Header: "Last updated",
        accessor: "updatedAt",
        Cell: ({ cell }) => {
          return cell.value
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
          const lessonId = cell.row.original.node?.id
          const href = {
            query: {
              user: userId,
              course: courseId,
              ...(lessonId && {lesson: lessonId})
            }
          }

          return (
            <div className="flex space-x-4 justify-center">
              <ButtonLink href={href}>See details</ButtonLink>
            </div>
          )
        }
      }
    ],
    []
  );

  return (
    <Table tableData={tableData} tableCols={tableCols} />
  );
}

export default UserLessonsReportTable