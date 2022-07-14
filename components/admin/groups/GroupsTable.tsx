import { useQuery } from '@apollo/client';
import React, { useContext, useMemo } from 'react';
import Table from '../../Table';
import { GET_GROUPS, GroupFragment } from '../../../graphql/queries/groups';
import { GetGroups } from '../../../graphql/queries/__generated__/GetGroups';
import Button from '../../Button';
import ButtonLink from '../../ButtonLink';
import useDeleteGroup from '../../../hooks/groups/useDeleteGroup';
import ItemWithImageTableCell from '../../common/cells/ItemWithImageTableCell';
import DeleteGroupModal from './DeleteGroupModal';
import { ModalContext } from '../../../context/modalContext';

const GroupsTable = () => {

  const { loading, error, data: queryData } = useQuery<GetGroups>(GET_GROUPS);

  const editUrl = '/admin/users/groups/edit'

  const { handleModal } = useContext(ModalContext)

  const handleDeleteClick = (id) => {
    handleModal({
      title: `Delete group`,
      content: <DeleteGroupModal groupId={id} />
    })
  }

  // Table data is memo-ised due to this:
  // https://github.com/tannerlinsley/react-table/issues/1994
  const tableData = useMemo(
    () => {
      return queryData?.groups?.edges?.map(edge => edge.node).filter(node => !node._deleted) || []
    }, [queryData]
  );

  const tableCols = useMemo(() => {
    return [
      {
        Header: "Group Name",
        accessor: "name", // accessor is the "key" in the data
        Cell: ({ cell }) => {
          const userCount = cell.row.original.users.totalCount
          const cellProps = {
            image: cell.row.original.image?.location,
            title: cell.value,
            secondary: `${userCount} user${userCount !== 1 ? 's' : ''}`,
            href: cell.row.original.id && `${editUrl}?id=${cell.row.original.id}`
          }
          return (
            <ItemWithImageTableCell { ...cellProps } />
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