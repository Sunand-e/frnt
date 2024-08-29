import { useQuery } from '@apollo/client';
import React, { useContext, useMemo } from 'react';
import Table from '../../common/tables/Table';
import { GET_GROUPS } from '../../../graphql/queries/groups';
import { GetGroups } from '../../../graphql/queries/__generated__/GetGroups';
import dayjs from 'dayjs'
import GroupActionsMenu from '../GroupActionsMenu';
import useConfirmDelete from '../../../hooks/useConfirmDelete';
import useDeleteGroup from '../../../hooks/groups/useDeleteGroup';
import useUserHasCapability from '../../../hooks/users/useUserHasCapability';
import { commonTableCols } from '../../../utils/commonTableCols';
import GroupTitleCell from '../../common/cells/GroupTitleCell';
var advancedFormat = require('dayjs/plugin/advancedFormat')

dayjs.extend(advancedFormat)

const OrganisationsTable = () => {

  const { loading, error, data: queryData } = useQuery<GetGroups>(GET_GROUPS);
  const { deleteGroup } = useDeleteGroup()
  const { isSuperAdmin } = useUserHasCapability()
  const { confirmDelete } = useConfirmDelete({
    itemType: 'organisation',
  })

  const deleteOrganisations = (ids: Array<string>) => {
    confirmDelete({
      onConfirm: () => {
        ids.forEach(id => deleteGroup(id))
      },
      amount: ids.length
    })
  }
  const editUrl = '/admin/users/organisations/edit'

  // Table data is memo-ised due to this:
  // https://github.com/tannerlinsley/react-table/issues/1994
  const tableData = useMemo(
    () => {
      return queryData?.groups?.edges?.map(edge => edge.node).filter(node => node.isOrganisation === true && !node._deleted) || []
    }, [queryData]
  );

  const tableCols = useMemo(() => {

    return [
      {
        header: "Organisation",
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
        header: "Provided Courses",
        accessorFn: row => row.provisionedCourses?.totalCount,
      },
      {
        header: "Credits",
        accessorFn: row => row.creditsUsed,
        cell: ({ cell }) => (
          <>
            {cell.getValue() || 0} / {cell.row.original.creditTotal || 0} credits used
          </>
        )
      },
      {
        ...commonTableCols.actions,
        cell: ({ cell }) => <GroupActionsMenu group={cell.row.original} />,
        width: 300
      }
    ]
  }, []);

  const bulkActions = [
    ...isSuperAdmin ? [{
      label: 'Delete organisation(s)',
      onClick: (ids: Array<string>) => ids.length && deleteOrganisations(ids)
    }] : []
  ]

  const tableProps = {
    tableData,
    tableCols,
    bulkActions,
    options: {
      selectable: false
    },
    filters: ['global']
  }
    
  return (
    <Table { ...tableProps } />
  );
}

export default OrganisationsTable