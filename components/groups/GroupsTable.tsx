import { useQuery } from '@apollo/client';
import React, { useMemo } from 'react';
import Table from '../common/tables/Table';
import { GET_GROUPS } from '../../graphql/queries/groups';
import { GetGroups } from '../../graphql/queries/__generated__/GetGroups';
import dayjs from 'dayjs'
import GroupActionsMenu from './GroupActionsMenu';
import useConfirmDelete from '../../hooks/useConfirmDelete';
import useDeleteGroup from '../../hooks/groups/useDeleteGroup';
import useUserHasCapability from '../../hooks/users/useUserHasCapability';
import { commonTableCols } from '../../utils/commonTableCols';
import GroupTitleCell from '../common/cells/GroupTitleCell';
import { getAssociatedContentString } from '../../utils/getAssociatedContentString';
var advancedFormat = require('dayjs/plugin/advancedFormat')
dayjs.extend(advancedFormat)

const GroupsTable = () => {

  const { loading, error, data: queryData } = useQuery<GetGroups>(GET_GROUPS);
  const { deleteGroup } = useDeleteGroup()
  const { isSuperAdmin } = useUserHasCapability()
  const editUrl = '/admin/users/groups/edit'

  const { confirmDelete } = useConfirmDelete({
    itemType: 'group',
  })

  const deleteGroups = (ids: Array<string>) => {
    confirmDelete({
      onConfirm: () => {
        ids.forEach(id => deleteGroup(id))
      },
      amount: ids.length
    })
  }

  // Table data is memo-ised due to this:
  // https://github.com/tannerlinsley/react-table/issues/1994
  const tableData = useMemo(
    () => {
      return queryData?.groups?.edges
        ?.map(edge => edge.node)
        .filter(node => !(node.isOrganisation === true) && !node._deleted)
        .sort((a,b) => ('' + a.name).localeCompare(b.name)) || []
    }, [queryData]
  );

  const tableCols = useMemo(() => {
    return [
      {
        header: "Group",
        accessorKey: "name", // accessor is the "key" in the data
        cell: ({ cell }) => {
          const group = cell.row.original
          const props = { href: `${editUrl}?id=${group.id}` }
          return <GroupTitleCell group={group} itemWithImageProps={props} />
        }
      },
      {
        header: "Users",
        accessorKey: "users.totalCount",
      },
      commonTableCols.createdAt,
      {
        header: "Assigned content",
        accessorFn: row => row.assignedContent?.totalCount,
        cell: ({ cell }) => {
          const group = cell.row.original;
          return getAssociatedContentString(group, 'assigned');
        }
      },
      {
        header: "Provided content",
        accessorFn: row => row.providedContent?.totalCount,
        cell: ({ cell }) => {
          const group = cell.row.original;
          return getAssociatedContentString(group, 'provisioned');
        }
      },
      {
        width: 300,
        header: "Actions",
        accessorKey: "actions",
        cell: ({ cell }) => <GroupActionsMenu group={cell.row.original} />
      }
    ]
  }, []);

  const bulkActions = [
    ...isSuperAdmin ? [{
      label: 'Delete group(s)',
      onClick: (ids: Array<string>) => ids.length && deleteGroups(ids)
    }] : []
  ]

  const tableProps = {
    tableData,
    tableCols,
    bulkActions,
    options: {
      selectable: false
    },
    filters: ['global'],
    isLoading: loading,
    loadingText: 'Loading groups',
  }
    
  return (
    <Table { ...tableProps } />
  );
}

export default GroupsTable