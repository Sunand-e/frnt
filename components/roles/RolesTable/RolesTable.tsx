import React, { useMemo } from 'react';
import Table from '../../common/Table';
import ButtonLink from '../../common/ButtonLink';
import RoleNameCell from './RoleNameCell';
import useGetRoles from '../../../hooks/roles/useGetRoles';
import useDeleteRole from '../../../hooks/roles/useDeleteRole';
import Button from '../../common/Button';
import LoadingSpinner from '../../common/LoadingSpinner';

const RolesTable = () => {

  const { roles, loading, error } = useGetRoles()
  
  const { deleteRole } = useDeleteRole()

  const handleDeleteClick = (id) => {
    deleteRole(id)
  }

  const editUrl = '/admin/users/roles/edit'

  // Table data is memo-ised due to this:
  // https://github.com/tannerlinsley/react-table/issues/1994
  const tableData = useMemo(
    () => {
      return roles?.filter(role => {
        return !role._deleted && role.roleType !== 'content_item_role'
          && role.name !== 'User'
      }) || []
    }, [roles]
  );

   const tableCols = useMemo(
    () => [
      {
        Header: "Role Name",
        accessor: "name", // accessor is the "key" in the data
        Cell: RoleNameCell
      },
      {
        Header: "Role Type",
        accessor: "roleType",
        Cell: ({cell}) => {
          const roleTypes = {
            'tenant_role': 'Global Role',
            'group_role': 'Group Role',
          }
          return roleTypes[cell.value] || ''
        }

      },
      {
        width: 300,
        Header: "Actions",
        accessor: "wa",
        Cell: ({ cell }) => {
          const href = cell.row.original.id && `${editUrl}?id=${cell.row.original.id}`
          return (
            <div className="flex space-x-4 justify-center">
              <ButtonLink href={href}>Edit</ButtonLink>
              <Button
                onClick={() => handleDeleteClick(cell.row.original.id)}
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
    <>
      { loading && (
        <LoadingSpinner />
      )}
      { error && (
        <p>Unable to fetch roles.</p>
      )}
      { (!loading && !error) && (
        <Table tableData={tableData} tableCols={tableCols} />
      )}
    </>
  );
}

export default RolesTable