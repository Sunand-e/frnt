import { useQuery } from '@apollo/client';
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import Table from '../common/tables/Table';
import { GET_USERS } from '../../graphql/queries/users';
import { GetUsers } from '../../graphql/queries/__generated__/GetUsers';
import { ModalContext } from '../../context/modalContext';
import ItemWithImage from '../common/cells/ItemWithImage';
import {User} from '@styled-icons/fa-solid/User'
import UserActionsMenu from './UserActionsMenu';
import useSendInvite from '../../hooks/useSendInvite';

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
        accessorFn: row => row.fullName,
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
        accessorKey: "actions",
        cell: ({ cell }) => <UserActionsMenu user={cell.row.original} />
      }
    ],
    []
  );

  const [ rowSelection, setRowSelection] = useState({})

  const { sendInvite } = useSendInvite()

  const sendInvitationEmails = useCallback(() => {
    sendInvite(rowSelection)
  },[rowSelection])

  const bulkActions = [
    {
      label: 'Send invites to selected users',
      onClick: sendInvitationEmails
    },
    {
      label: <span className="text-red-500">Delete users</span>,
      onClick: console.log('test'),
    },
  ]

  const tableProps = {
    tableData, 
    tableCols, 
    bulkActions,
    typeName: 'user',
    filters: ['global'],
    onRowSelect: setRowSelection
  }

  return (
    <Table { ...tableProps } />
  );
}

export default UsersTable
