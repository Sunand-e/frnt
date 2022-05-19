import { useQuery } from '@apollo/client';
import React, { useMemo } from 'react';
import Table from '../../Table';
import { GET_USERS } from '../../../graphql/queries/users';
import { GetUsers } from '../../../graphql/queries/__generated__/GetUsers';
import ButtonLink from '../../ButtonLink';
import Button from '../../Button';
import ItemWithImageTableCell from '../../common/cells/ItemWithImageTableCell';

const UsersTable = () => {

  const { loading, error, data: queryData } = useQuery<GetUsers>(GET_USERS);
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
        Header: "Roles",
        accessor: "roles[0].name", // accessor is the "key" in the data
        Cell: ({ cell }) => {
          return cell.row.original.roles.map(role => {
            return role.name
          }).join(', ')
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
              <ButtonLink href={href}>See user's course report</ButtonLink>
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