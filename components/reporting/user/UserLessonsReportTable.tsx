import { gql, useQuery } from '@apollo/client';
import React, { useContext, useMemo } from 'react';
import Table from '../../common/Table'
import ButtonLink from '../../common/ButtonLink';
import { ModalContext } from '../../../context/modalContext';
import ItemWithImage from '../../common/cells/ItemWithImage';
import useGetCourseUsers from '../../../hooks/courses/useGetCourseUsers';
import { useRouter } from '../../../utils/router';
import LoadingSpinner from '../../common/LoadingSpinner';
import { Dot } from '../../common/misc/Dot';
import { lessonTypes } from '../../courses/lessonTypes';
import dayjs from 'dayjs';
var advancedFormat = require('dayjs/plugin/advancedFormat')
dayjs.extend(advancedFormat)

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
              contentType
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
          const IconComponent = lessonTypes[cell.row.original.node?.contentType]?.icon || null
          const cellProps = {
            title: cell.row.original.node.title,
            icon: !!IconComponent && <IconComponent className="hidden w-6 h-full bg-grey-500 text-main-secondary" />
          }
          return (
            <ItemWithImage { ...cellProps } />
          )
        }
      },
      {
        Header: "First access",
        accessor: "createdAt",
        Cell: ({ cell }) => {
          return dayjs(cell.value).format('Do MMMM YYYY [at] h:mm A')
        }
      },

      {
        Header: "Last visited",
        accessor: "updatedAt",
        Cell: ({ cell }) => {
          return dayjs(cell.value).format('Do MMMM YYYY [at] h:mm A')
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
      { loading && <LoadingSpinner text={(
        <>
          Loading lessons
          <Dot>.</Dot>
          <Dot>.</Dot>
          <Dot>.</Dot>
        </>
      )} /> }
      { error && (
        <p>Unable to fetch user's lessons.</p>
      )}
      { (!loading && !error) && (
        <Table tableData={tableData} tableCols={tableCols} />
      )}
    </>
  );
}

export default UserLessonsReportTable