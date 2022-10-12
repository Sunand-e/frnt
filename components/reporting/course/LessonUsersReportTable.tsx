import React, { useContext, useMemo, useState } from 'react';
import Table from '../../common/Table'
import ButtonLink from '../../common/ButtonLink';
import ItemWithImage from '../../common/cells/ItemWithImage';
import { ModalContext } from '../../../context/modalContext';
import { gql, useQuery } from '@apollo/client';
import { useRouter } from '../../../utils/router';
import LoadingSpinner from '../../common/LoadingSpinner';
import { Dot } from '../../common/misc/Dot';
import { User } from 'styled-icons/fa-solid';
import dayjs from 'dayjs';
var advancedFormat = require('dayjs/plugin/advancedFormat')
dayjs.extend(advancedFormat)

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
            imageSrc: cell.row.original.profileImageUrl,
            icon: <User className="hidden w-auto h-full bg-grey-500 text-main-secondary text-opacity-50" />,
            // href: {
            //   query: {
            //     lesson: lessonId,
            //     ...(user.id && { user: user.id } )
            //   }
            // }
          }
          return (
            <ItemWithImage { ...cellProps } />
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
      { loading && <LoadingSpinner text={(
        <>
          Loading users
          <Dot>.</Dot>
          <Dot>.</Dot>
          <Dot>.</Dot>
        </>
      )} /> }
      { error && (
        <p>Unable to fetch users for this lesson.</p>
      )}
      { (!loading && !error) && (
        <Table tableData={tableData} tableCols={tableCols} />
      )}
    </>
  );
}

export default LessonUsersReportTable