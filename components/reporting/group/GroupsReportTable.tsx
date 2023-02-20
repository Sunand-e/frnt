import { useQuery } from '@apollo/client';
import React, { useMemo } from 'react';
import Table from '../../common/tables/Table';
import { GET_GROUPS } from '../../../graphql/queries/groups';
import { GetGroups } from '../../../graphql/queries/__generated__/GetGroups';
import ButtonLink from '../../common/ButtonLink';
import {Group2} from "@styled-icons/remix-fill/Group2"
import ItemWithImage from '../../common/cells/ItemWithImage';
import dayjs from 'dayjs'
import { useRouter } from '../../../utils/router';
import ReportTable from '../ReportTable';
var advancedFormat = require('dayjs/plugin/advancedFormat')
dayjs.extend(advancedFormat)

const GroupsReportTable = () => {

  const { loading, error, data: queryData } = useQuery<GetGroups>(GET_GROUPS);

  const router = useRouter()

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
        id: "name", // accessor is the "key" in the data
        header: "Group Name",
        accessorKey: "name", // accessor is the "key" in the data
        cell: ({ cell }) => {
          const userCount = cell.row.original.users.totalCount
          const cellProps = {
            image: cell.row.original.image,
            title: cell.getValue(),
            icon: <Group2 className="hidden w-auto h-full bg-grey-500 text-main-secondary text-opacity-80" />,
            secondary: `${userCount} user${userCount !== 1 ? 's' : ''}`,
          }
          return (
            <ItemWithImage { ...cellProps } />
            )
          }
        },
        {
        id: "createdAt",
        header: "Date Created",
        accessorKey: "createdAt",
        cell: ({ cell }) => {
          return dayjs(cell.getValue()).format('Do MMMM YYYY [at] h:mm A')
        }
      },
      {
        id: "enrolled",
        header: "Enrolled Courses",
        accessorFn: row => row.enrolledCourses.totalCount,
      },
      {
        id: "actions",
        width: 300,
        header: "",
        accessorKey: "actions",
        hideOnCsv: true,
        cell: ({ cell }) => {
          const usersHref = cell.row.original.id && {
            query: {
              ...router.query,
              type: 'user',
              group: cell.row.original.id,
            },
          };

          const coursesHref = cell.row.original.id && {
            query: {
              ...router.query,
              type: 'course',
              group: cell.row.original.id,
            },
          };

          return (
            <div className="flex space-x-4 justify-center">
              <ButtonLink href={usersHref}>View users</ButtonLink>
              <ButtonLink href={coursesHref}>View courses</ButtonLink>
            </div>
          );
        },
      }
    ]
  }, []);

  return (
    <ReportTable
      exportFilename="Group report"
      tableData={tableData}
      tableCols={tableCols}
      title={<>Groups</>}
      simpleHeader={true}
    />
  );
}

export default GroupsReportTable