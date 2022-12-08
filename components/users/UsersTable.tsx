import { useQuery } from '@apollo/client';
import React, { useContext, useMemo, useState } from 'react';
import Table from '../common/tables/Table';
import { GET_USERS } from '../../graphql/queries/users';
import { GetUsers } from '../../graphql/queries/__generated__/GetUsers';
import { ModalContext } from '../../context/modalContext';
import DeleteUserModal from './DeleteUserModal';
import ItemWithImage from '../common/cells/ItemWithImage';
import {User} from '@styled-icons/fa-solid/User'
import UserActionsMenu from './UserActionsMenu';

const UsersTable = () => {

  const { loading, error, data: queryData } = useQuery<GetUsers>(GET_USERS);
  // Table data is memo-ised due to this:
  // https://github.com/tannerlinsley/react-table/issues/1994
  const tableData = useMemo(() => queryData?.users?.edges?.map(edge => edge.node) || [], [queryData]);

  const editUrl = '/admin/users/edit'

  const tableCols = useMemo(
    () => [
      {
        header: "User ",
        cell: ({ cell }) => (
          <ItemWithImage 
            title={cell.row.original.fullName}
            secondary={cell.row.original.email}
            href={cell.row.original.id && `${editUrl}?id=${cell.row.original.id}`}
            imageSrc={cell.row.original.profileImageUrl}
            icon={<User className="hidden w-auto h-full bg-grey-500 text-main-secondary text-opacity-50" />}
            placeholder={"/images/user-generic.png"}
          />
        )
      },
      {
        header: "Groups",
        accessorFn: row => row.groups.edges.map(edge => edge.node.name).join(', '),
        cell: ({ cell }) => {
          return cell.getValue() || '-'
        }
      },
      {
        header: "Global Roles",
        id: 'roles',
        cell: ({ cell }) => {
          return cell.row.original.roles.filter(
            role => role.name !== 'User'
          ).map(role => role.name).join(', ') || '-'
        }
      },
      {
        width: 300,
        header: "Actions",
        accessorKey: "wa",
        cell: ({ cell }) => <UserActionsMenu user={cell.row.original} />
      }
    ],
    []
  );

  const bulkActions = [
    {
      label: 'Send invites to selected users',
      onClick: console.log('test')
    },
    {
      label: <span className="text-red-500">Delete users</span>,
      onClick: console.log('test'),
    },
  ]

  const [ rowSelection, setRowSelection] = useState({})

  return (
    <Table {...{
      tableData, 
      tableCols, 
      bulkActions,
      rowSelection,
      onRowSelectionChange: setRowSelection
     }} />
  );
}

export default UsersTable
