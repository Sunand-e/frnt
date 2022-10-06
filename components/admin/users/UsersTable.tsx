import { useQuery } from '@apollo/client';
import React, { useContext, useMemo } from 'react';
import Table from '../../Table';
import { GET_USERS } from '../../../graphql/queries/users';
import { GetUsers } from '../../../graphql/queries/__generated__/GetUsers';
import Link from 'next/link';
import ButtonLink from '../../ButtonLink';
import Button from '../../Button';
import { ModalContext } from '../../../context/modalContext';
import DeleteUserModal from './DeleteUserModal';
import ItemWithImageTableCell from '../../common/cells/ItemWithImageTableCell';
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
        Header: "Name",
        Cell: ({ cell }) => (
          <ItemWithImageTableCell 
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
        Header: "Roles",
        accessor: "roles[0].name", // accessor is the "key" in the data
        Cell: ({ cell }) => {
          return cell.row.original.roles.filter(
            role => role.name !== 'User'
          ).map(role => role.name).join(', ') || '-'
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
