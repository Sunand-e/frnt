import { useQuery } from '@apollo/client';
import React, { useContext, useMemo } from 'react';
import Table from '../common/tables/Table';
import { GET_GROUPS } from '../../graphql/queries/groups';
import { GetGroups } from '../../graphql/queries/__generated__/GetGroups';
import Button from '../common/Button';
import ButtonLink from '../common/ButtonLink';
import {Group2} from "@styled-icons/remix-fill/Group2"
import ItemWithImage from '../common/cells/ItemWithImage';
import DeleteGroupModal from './DeleteGroupModal';
import { ModalContext } from '../../context/modalContext';
import dayjs from 'dayjs'
import GroupActionsMenu from './GroupActionsMenu';
var advancedFormat = require('dayjs/plugin/advancedFormat')
dayjs.extend(advancedFormat)

const GroupsTable = () => {

  const { loading, error, data: queryData } = useQuery<GetGroups>(GET_GROUPS);

  const editUrl = '/admin/users/groups/edit'

  const { handleModal } = useContext(ModalContext)



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
        header: "Group Name",
        accessorKey: "name", // accessor is the "key" in the data
        cell: ({ cell }) => {
          const userCount = cell.row.original.users.totalCount
          const cellProps = {
            image: cell.row.original.image,
            title: cell.getValue(),
            icon: <Group2 className="hidden w-auto h-full bg-grey-500 text-main-secondary text-opacity-80" />,
            secondary: `${userCount} user${userCount !== 1 ? 's' : ''}`,
            href: cell.row.original.id && `${editUrl}?id=${cell.row.original.id}`
          }
          return (
            <ItemWithImage { ...cellProps } />
          )
        }
      },
      {
        header: "Date Created",
        accessorKey: "createdAt",
        cell: ({ cell }) => {
          return dayjs(cell.getValue()).format('Do MMMM YYYY [at] h:mm A')
        }
      },
      {
        header: "Enrolled Courses",
        accessorFn: row => row.enrolledCourses?.totalCount,
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

  const options = {
    selectable: false
  }
  
  return (
    <Table {...{tableData, tableCols, options }} />
  );
}

export default GroupsTable