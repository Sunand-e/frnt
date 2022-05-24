import { useQuery } from '@apollo/client';
import React, { useContext, useEffect, useMemo } from 'react';
import Table from '../../Table';
import { GET_USERS } from '../../../graphql/queries/users';
import { GetUsers } from '../../../graphql/queries/__generated__/GetUsers';
import Link from 'next/link';
import ButtonLink from '../../ButtonLink';
import Button from '../../Button';
import { ModalContext } from '../../../context/modalContext';
import ItemWithImageTableCell from '../../common/cells/ItemWithImageTableCell';
import useGetCourseUsers from '../../../hooks/courses/useGetCourseUsers';
import { useRouter } from '../../../utils/router';
import dayjs from 'dayjs';
var advancedFormat = require('dayjs/plugin/advancedFormat')
dayjs.extend(advancedFormat)

const CourseUsersTable = () => {

  const router = useRouter()

  const { course: id } = router.query

  const { loading, error, users, course } = useGetCourseUsers(id)

  // Table data is memo-ised due to this:
  // https://github.com/tannerlinsley/react-table/issues/1994
  const tableData = useMemo(() => users || [], [users]);

  const editUrl = '/admin/users/edit'
  console.log('tableData')
  console.log(tableData)

  const tableCols = useMemo(
    () => [
      {
        Header: "Name",
        Cell: ({ cell }) => {
          const cellProps = {
            title: cell.row.original.fullName,
            secondary: cell.row.original.email,
            href: cell.row.original.id && `${editUrl}?id=${cell.row.original.id}`
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
          const href = cell.row.original.id && {
            query: {
              course: id,
              user: cell.row.original.id
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
    <>
      <Table tableData={tableData} tableCols={tableCols} />
    </>
  );
}

export default CourseUsersTable