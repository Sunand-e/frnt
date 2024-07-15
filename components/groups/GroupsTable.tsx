import { useQuery } from '@apollo/client';
import React, { useMemo } from 'react';
import Table from '../common/tables/Table';
import { GET_GROUPS } from '../../graphql/queries/groups';
import { GetGroups } from '../../graphql/queries/__generated__/GetGroups';
import {Group2} from "@styled-icons/remix-fill/Group2"
import ItemWithImage from '../common/cells/ItemWithImage';
import dayjs from 'dayjs'
import GroupActionsMenu from './GroupActionsMenu';
import useConfirmDelete from '../../hooks/useConfirmDelete';
import useDeleteGroup from '../../hooks/groups/useDeleteGroup';
import useUserHasCapability from '../../hooks/users/useUserHasCapability';
import { commonTableCols } from '../../utils/commonTableCols';
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
        header: "Group Name",
        accessorKey: "name", // accessor is the "key" in the data
        cell: ({ cell }) => {
          // const userCount = cell.row.original.users.totalCount?
          const cellProps = {
            image: cell.row.original.image,
            title: cell.getValue(),
            icon: <Group2 className="hidden w-auto h-full bg-grey-500 text-main-secondary text-opacity-80" />,
            href: cell.row.original.id && `${editUrl}?id=${cell.row.original.id}`
          }
          return (
            <ItemWithImage { ...cellProps } />
          )
        }
      },
      {
        header: "Users",
        accessorKey: "users.totalCount",
      },
      commonTableCols.createdAt,
      {
        header: "Enrolled Courses",
        accessorFn: row => row.assignedCourses?.totalCount,
      },
      {
        header: "Assigned Resources",
        accessorFn: row => row.assignedResources?.totalCount,
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