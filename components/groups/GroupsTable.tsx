import { useQuery } from '@apollo/client';
import React, { useContext, useMemo } from 'react';
import Table from '../common/Table';
import { GET_GROUPS } from '../../graphql/queries/groups';
import { GetGroups } from '../../graphql/queries/__generated__/GetGroups';
import Button from '../common/Button';
import ButtonLink from '../common/ButtonLink';
import {Group2} from "@styled-icons/remix-fill/Group2"
import ItemWithImage from '../common/cells/ItemWithImage';
import DeleteGroupModal from './DeleteGroupModal';
import { ModalContext } from '../../context/modalContext';
import dayjs from 'dayjs'
var advancedFormat = require('dayjs/plugin/advancedFormat')
dayjs.extend(advancedFormat)

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
            image: cell.row.original.image,
            title: cell.value,
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
        Header: "Date Created",
        accessor: "createdAt",
        Cell: ({ cell }) => {
          return dayjs(cell.value).format('Do MMMM YYYY [at] h:mm A')
        }
      },
      {
        Header: "Enrolled Courses",
        accessor: "enrolledCourses.totalCount",
      },
      {
        Header: "Assigned Resources",
        accessor: "assignedResources.totalCount",
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
    ]
  }, []);

  return (
    <Table tableData={tableData} tableCols={tableCols} />
  );
}

export default GroupsTable