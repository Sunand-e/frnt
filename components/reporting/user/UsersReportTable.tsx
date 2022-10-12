import { useQuery } from '@apollo/client';
import React, { useMemo } from 'react';
import Table from '../../common/Table'
import { GET_USERS, GET_USERS_COURSES } from '../../../graphql/queries/users';
import { GetUsers } from '../../../graphql/queries/__generated__/GetUsers';
import ButtonLink from '../../common/ButtonLink';
import Button from '../../common/Button';
import ItemWithImage from '../../common/cells/ItemWithImage';
import dayjs from 'dayjs';
import LoadingSpinner from '../../common/LoadingSpinner';
import { Dot } from '../../common/misc/Dot';
import {User} from '@styled-icons/fa-solid/User'
var advancedFormat = require('dayjs/plugin/advancedFormat')
dayjs.extend(advancedFormat)

const UsersReportTable = () => {

  const { loading, error, data: queryData } = useQuery<GetUsers>(GET_USERS_COURSES);
  // Table data is memo-ised due to this:
  // https://github.com/tannerlinsley/react-table/issues/1994
  const tableData = useMemo(() => queryData?.users?.edges?.map(edge => edge.node) || [], [queryData]);

  const editUrl = '/admin/users/edit'

  const tableCols = useMemo(() => [
    {
      Header: "Name",
      Cell: ({ cell }) => {
        const cellProps = {
          imageSrc: cell.row.original.profileImageUrl,
          icon: <User className="hidden w-auto h-full bg-grey-500 text-main-secondary text-opacity-50" />,
          title: cell.row.original.fullName,
          secondary: cell.row.original.email,
          href: cell.row.original.id && {
            query: {
              user: cell.row.original.id
            }
          }
        }
        return (
          <ItemWithImage placeholder="/images/user-generic.png" { ...cellProps } />
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
        const href = cell.row.original.id && {
          query: {
            user: cell.row.original.id
          }
        }
        return (          
          <div className="space-x-4">
            <ButtonLink href={href}>See details</ButtonLink>
          </div>
        )
      }
    }
  ], []);

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
        <p>Unable to fetch users.</p>
      )}
      { (!loading && !error) && (
        <Table tableData={tableData} tableCols={tableCols} />
      )}
    </>
  );
}

export default UsersReportTable