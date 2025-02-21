import { useQuery } from '@apollo/client';
import React, { useMemo } from 'react';
import { GET_GROUPS } from '../../../graphql/queries/groups';
import { GetGroups } from '../../../graphql/queries/__generated__/GetGroups';
import ButtonLink from '../../common/ButtonLink';
import { Group2 } from "@styled-icons/remix-fill/Group2"
import ItemWithImage from '../../common/cells/ItemWithImage';
import dayjs from 'dayjs'
import { useRouter } from '../../../utils/router';
import ReportTable from '../ReportTable';
import { commonTableCols } from '../../../utils/commonTableCols';
var advancedFormat = require('dayjs/plugin/advancedFormat')
dayjs.extend(advancedFormat)

const GroupsReportTable = () => {

  const { loading, error, data: queryData } = useQuery<GetGroups>(GET_GROUPS);

  const router = useRouter()

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
            icon: <Group2 className="p-1" />,
            secondary: `${userCount} user${userCount !== 1 ? 's' : ''}`,
          }
          return (
            <ItemWithImage {...cellProps} />
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
        accessorFn: (row: any) => row.assignedCourses.totalCount,
      },
      {
        ...commonTableCols.actions,
        width: 300,
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