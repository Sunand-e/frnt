import { useQuery } from '@apollo/client';
import React, { useContext, useMemo } from 'react';
import Table from '../common/Table';
import { GET_USERS } from '../../graphql/queries/users';
import { GetUsers } from '../../graphql/queries/__generated__/GetUsers';
import Link from 'next/link';
import ButtonLink from '../common/ButtonLink';
import Button from '../common/Button';
import { ModalContext } from '../../context/modalContext';
import DeleteUserModal from './DeleteUserModal';
import ItemWithImage from '../common/cells/ItemWithImage';
import {User} from '@styled-icons/fa-solid/User'

const UsersTable = () => {

  const { loading, error, data: queryData } = useQuery<GetUsers>(GET_USERS);

  const { handleModal } = useContext(ModalContext)
  // Table data is memo-ised due to this:
  // https://github.com/tannerlinsley/react-table/issues/1994
  const tableData = useMemo(() => queryData?.users?.edges?.map(edge => edge.node) || [], [queryData]);

  const editUrl = '/admin/users/edit'
  console.log('tableData')
  console.log(tableData)
  const handleDelete = (value) => {
    handleModal({
      title: `Delete user`,
      content: <DeleteUserModal userId={value} />
    })
  }

  const tableCols = useMemo(
    () => [
      {
        header: "Name",
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
        // className: 'text-center',
        cell: ({ cell }) => {
          const href = cell.row.original.id && `${editUrl}?id=${cell.row.original.id}`
          return (          
            <div className="space-x-4">
              <ButtonLink href={href}>Edit</ButtonLink>
              <Button
                onClick={() => handleDelete(cell.row.original.id)}
              >
                Delete
              </Button>
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
