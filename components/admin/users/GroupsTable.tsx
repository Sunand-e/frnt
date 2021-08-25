import { useMutation, useQuery } from '@apollo/client';
import React, { useMemo } from 'react';
import Table from '../../Table';
import { GET_GROUPS, GroupFragment } from '../../../graphql/queries/allQueries';
import { GetGroups } from '../../../graphql/queries/__generated__/GetGroups';
import Button from '../../Button';
import { DELETE_GROUP } from '../../../graphql/mutations/allMutations';
import { client } from '../../../graphql/client';
import Link from 'next/link';
import ButtonLink from '../../ButtonLink';

const GroupsTable = () => {

  const { loading, error, data: queryData } = useQuery<GetGroups>(GET_GROUPS);
  
  const [deleteGroup, { data: deletedData }] = useMutation<DeleteGroup>(DELETE_GROUP);

  const editUrl = '/admin/users/groups/edit'

  const handleEditClick = (id) => {

  }

  const handleDeleteClick = (id) => {
    deleteGroup({
      variables: { 
        id
      },
      optimisticResponse: {
        __typename: 'Mutation',
        deleteGroup: {
          __typename: 'DeleteGroupPayload',
          group: {
            id,
            _deleted: true,
          },
          message: ''
        },
      },

      update(cache, { data: deleteGroup }) {
        // We get a single item.
        const group = cache.readFragment({
          id: `Group:${id}`,
          fragment: GroupFragment,
        });
        // Then, we update it.
        if (group) {
          cache.writeFragment({
            id: `Group:${id}`,
            fragment: GroupFragment,
            data: {
              ...group,
              _deleted: true
            },
          });
        }
      }
    })
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
              <Link href={href}>
                <ButtonLink>Edit</ButtonLink>
              </Link>
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