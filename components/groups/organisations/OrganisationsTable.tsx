import { useQuery } from '@apollo/client';
import React, { useContext, useMemo } from 'react';
import Table from '../../common/tables/Table';
import { GET_GROUPS } from '../../../graphql/queries/groups';
import { GetGroups } from '../../../graphql/queries/__generated__/GetGroups';
import Button from '../../common/Button';
import ButtonLink from '../../common/ButtonLink';
import {Group2} from "@styled-icons/remix-fill/Group2"
import ItemWithImage from '../../common/cells/ItemWithImage';
import dayjs from 'dayjs'
import GroupActionsMenu from '../GroupActionsMenu';
var advancedFormat = require('dayjs/plugin/advancedFormat')
dayjs.extend(advancedFormat)

const OrganisationsTable = () => {

  const { loading, error, data: queryData } = useQuery<GetGroups>(GET_GROUPS);

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
          const userCount = cell.row.original.users.totalCount
          const cellProps = {
            image: cell.row.original.image,
            title: cell.getValue(),
            icon: <Group2 className="hidden w-auto h-full bg-grey-500 text-main-secondary text-opacity-80" />,
            secondary: `${userCount} member${userCount !== 1 ? 's' : ''}`,
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
        cell: ({ cell }) => dayjs(cell.getValue()).format('Do MMMM YYYY [at] h:mm A')
      },
      {
        header: "Provided Courses",
        accessorFn: row => row.provisionedCourses?.totalCount,
      },
      {
        header: "Enrolments",
        accessorFn: row => row.enrolments,
        cell: ({ cell }) => (
          <>
            {cell.getValue() || 0} / {cell.row.original.enrolmentLicenseTotal || 0} licenses used
          </>
        )
      },
      {
        width: 300,
        header: "Actions",
        accessorKey: "actions",
        cell: ({ cell }) => <GroupActionsMenu group={cell.row.original} />
      }
    ]
  }, []);

  const tableProps = {
    tableData,
    tableCols,
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