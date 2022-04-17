import { useMutation, useQuery } from '@apollo/client';
import React, { useMemo } from 'react';
import Table from '../../Table';
import { GET_GROUPS, GroupFragment } from '../../../graphql/queries/groups';
import { GetGroups } from '../../../graphql/queries/__generated__/GetGroups';
import Button from '../../Button';
import { DELETE_GROUP } from "../../../graphql/mutations/group/DELETE_GROUP";
import { client } from '../../../graphql/client';
import Link from 'next/link';
import ButtonLink from '../../ButtonLink';
import { DeleteGroup, DeleteGroupVariables } from '../../../graphql/mutations/group/__generated__/DeleteGroup';
import useDeleteGroup from '../../../hooks/groups/useDeleteGroup';

const GroupsTable = () => {

  const { loading, error, data: queryData } = useQuery<GetGroups>(GET_GROUPS);
  
  const { deleteGroup } = useDeleteGroup()

  const editUrl = '/admin/users/groups/edit'

  const handleDeleteClick = (id) => {
    deleteGroup(id)
  }

  // Table data is memo-ised due to this:
  // https://github.com/tannerlinsley/react-table/issues/1994
  const tableData = useMemo(
    () => {
      return queryData?.groups.filter(item => !item._deleted) || []
    }, [queryData]
  );

  const tableCols = useMemo(() => {
    return [
      {
        Header: "Group Name",
        accessor: "name", // accessor is the "key" in the data
        Cell: ({ cell }) => {
          const href = cell.row.values.id && `${editUrl}?id=${cell.row.values.id}`
          return (
            <Link href={href}>
              <a className="mt-auto text-center p-2 text-blue-dark font-semibold uppercase">{cell.value}</a>
            </Link>
          )
        }
      },
      {
        Header: "ID",
        accessor: "id",
      },
      {
        width: 300,
        Header: "Actions",
        accessor: "wa",
        Cell: ({ cell }) => {
          const href = cell.row.values.id && `${editUrl}?id=${cell.row.values.id}`

          return (          
            <div className="flex space-x-4">
              <ButtonLink href={href}>Edit</ButtonLink>
              <Button 
                onClick={() => handleDeleteClick(cell.row.values.id)}
              >
                Delete
              </Button>
            </div>
          )
        }
      }
    ]
  }, []);

  return (
    <Table tableData={tableData} tableCols={tableCols} />
  );
}

export default GroupsTable