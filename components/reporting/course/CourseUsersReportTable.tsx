import React, { useMemo } from "react";
import Table from "../../common/tables/Table";
import ButtonLink from "../../common/ButtonLink";
import ItemWithImage from "../../common/cells/ItemWithImage";
import useGetCourseUsers from "../../../hooks/courses/useGetCourseUsers";
import { useRouter } from "../../../utils/router";
import LoadingSpinner from "../../common/LoadingSpinner";
import { Dot } from "../../common/misc/Dot";
import dayjs from "dayjs";
import { User } from "styled-icons/fa-solid";
import ReportTable from "../ReportTable";
import { commonTableCols } from "../../../utils/commonTableCols";
import Button from "../../common/Button";
import Link from "next/link";
var advancedFormat = require("dayjs/plugin/advancedFormat");
dayjs.extend(advancedFormat);

const CourseUsersReportTable = () => {
  const router = useRouter();

  const { course: id } = router.query;

  const { loading, error, userConnection, course } = useGetCourseUsers(id);
  
  // Table data is memo-ised due to this:
  // https://github.com/tannerlinsley/react-table/issues/1994
  const tableData = useMemo(
    () => userConnection?.edges || [],
    [userConnection]
  );

  const tableCols = useMemo(
    () => [
      {
        id: "name",
        header: "Name",
        accessorFn: row => row.node.fullName,
        cell: ({ cell }) => {
          const cellProps = {
            imageSrc: cell.row.original.node.profileImageUrl,
            icon: (
              <User className="hidden w-auto h-full bg-grey-500 text-main-secondary text-opacity-50" />
            ),
            title: cell.row.original.node.fullName,
            secondary: cell.row.original.node.email,
            href: cell.row.original.node.id && {
              query: {
                course: id,
                user: cell.row.original.node.id,
              },
            },
          };
          return <ItemWithImage {...cellProps} />;
        },
      },
      // {
      //   header: "JSON",
      //   cell: ({ cell }) => (
      //     <pre className='text-left'>
      //       {JSON.stringify(cell.row.original.node,null,2)}
      //     </pre>
      //   ),
      //   className: 'text-left'
      // },
      {
        id: "status",
        header: "Course status",
        accessorKey: "status",
      },
      {
        id: "score",
        header: "Score",
        accessorKey: "score",
      },
      {
        ...commonTableCols.createdAt,
        header: "First access",
      },
      {
        ...commonTableCols.updatedAt,
        header: "Last visited",
      },
      // {
      //   id: "completedAt",
      //   header: "Completed at",
      //   accessorKey: "completedAt",
      //   cell: ({ cell }) => {
      //     return cell.getValue() ? dayjs(cell.getValue()).format('Do MMMM YYYY [at] h:mm A') : noDataDash
      //   }
      // },

      // "visits": null,
      // "completed": null
      // {
      //   header: "Roles",
      //   accessorFn: row => row.roles[0].name, // accessor is the key in the data
      //   cell: ({ cell }) => {
      //     return cell.row.original.node.roles.map(role => {
      //       return role.name
      //     }).join(', ')
      //   }
      // },
      {
        id: "actions",
        header: "",
        hideOnCsv: true,
        width: 300,
        cell: ({ cell }) => {
          const userId = cell.row.original.node.id;
          const href = {
            query: {
              course: id,
              ...(userId && { user: userId }),
            },
          };

          return (
            <div className="flex space-x-4 justify-center">
              <ButtonLink href={href}>See details</ButtonLink>
            </div>
          );
        },
      },
    ],
    []
  );

  const backButton = {
    onClick: (e) => {
      router.push('/admin/reports')
    },
    text: 'Back to Courses'
  }

  return (
    <ReportTable
      title={(
        <>
          <span className="font-semibold">User report </span>
          <span className="font-normal">for course: </span>
          <span className="font-semibold">
            {course?.title}
          </span>
        </>
      )}
      simpleHeader={true}
      csvFilename={`Course users for ${course?.title}`}
      tableData={tableData}
      tableCols={tableCols}
      loadingText="Loading course users"
      errorText="Unable to fetch course users."
      loading={loading}
      error={error}
      // filters={['group']}
      // groupFilter={true}
    />
  );
};

export default CourseUsersReportTable;
