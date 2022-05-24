import { useQuery } from '@apollo/client';
import React, { useMemo } from 'react';
import Table from '../../Table';
import { GET_USERS, GET_USERS_COURSES } from '../../../graphql/queries/users';
import { GetUsers } from '../../../graphql/queries/__generated__/GetUsers';
import ButtonLink from '../../ButtonLink';
import Button from '../../Button';
import ItemWithImageTableCell from '../../common/cells/ItemWithImageTableCell';
import dayjs from 'dayjs';
var advancedFormat = require('dayjs/plugin/advancedFormat')
dayjs.extend(advancedFormat)

const UsersTable = () => {

  const { loading, error, data: queryData } = useQuery<GetUsers>(GET_USERS_COURSES);
  // Table data is memo-ised due to this:
  // https://github.com/tannerlinsley/react-table/issues/1994
  const tableData = useMemo(() => queryData?.users || [], [queryData]);

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
      {
        Header: "JSON",
        Cell: ({ cell }) => (
          <pre className='text-left'>
            {JSON.stringify(cell.row.original,null,2)}
          </pre>
        ),
        className: 'text-left'
      },
      {
        Header: "Courses Enrolled",
        accessor: "courses.totalCount",
      },
      
      {
        id: "not_started",
        Header: "Not Started",
        Cell: ({ cell }) => {
          return <span>&mdash;</span>
        }
      },
      {
        id: "in_progress",
        Header: "In Progress",
        Cell: ({ cell }) => {
          return <span>&mdash;</span>
        }
      },
      {
        id: "completed",
        Header: "Completed",
        Cell: ({ cell }) => {
          return <span>&mdash;</span>
        }
      },
      {
        width: 300,
        Header: "Actions",
        // className: 'text-center',
        Cell: ({ cell }) => {
          const href = cell.row.original.id && `${editUrl}?id=${cell.row.original.id}`
          return (          
            <div className="space-x-4">
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

export default UsersTable