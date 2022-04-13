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

const UsersTable = () => {

  const userImages = [
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    'https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  ]

  const { loading, error, data: queryData } = useQuery<GetUsers>(GET_USERS);

  const { handleModal } = useContext(ModalContext)
  
  // Table data is memo-ised due to this:
  // https://github.com/tannerlinsley/react-table/issues/1994
  const tableData = useMemo(() => queryData?.users || [], [queryData]);

  const editUrl = '/admin/users/edit'

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
        Cell: ({ cell }) => {
          const href = cell.row.original.id && `${editUrl}?id=${cell.row.original.id}`
          href
          return (
            <Link href={href}>
              <a className="text-blue-dark">
                <div className="flex items-center">
                  <div className="h-10 w-10 flex-shrink-0">
                    <img className="h-10 w-10 rounded-full" src={userImages[Math.floor(Math.random() * userImages.length)]} alt="" />
                  </div>
                  <div className="ml-4">
                    <div className="font-medium text-gray-900">{cell.row.original.fullName}</div>
                    <div className="text-gray-500">{cell.row.original.email}</div>
                  </div>
                </div>
                
              </a>
            </Link>
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