import React, { useMemo } from "react";
import Table from "../../common/Table";
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

  const noDataDash = <span>&mdash;</span>;

  // Table data is memo-ised due to this:
  // https://github.com/tannerlinsley/react-table/issues/1994
  const tableData = useMemo(
    () => userConnection?.edges || [],
    [userConnection]
  );

  const editUrl = "/admin/users/edit";

  const tableCols = useMemo(
    () => [
      {
        id: "name",
        Header: "Name",
        accessor: "node.fullName",
        Cell: ({ cell }) => {
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
      //   Header: "JSON",
      //   Cell: ({ cell }) => (
      //     <pre className='text-left'>
      //       {JSON.stringify(cell.row.original.node,null,2)}
      //     </pre>
      //   ),
      //   className: 'text-left'
      // },
      {
        id: "status",
        Header: "Course status",
        accessor: "status",
      },
      {
        id: "score",
        Header: "Score",
        accessor: "score",
      },
      {
        ...commonTableCols.createdAt,
        Header: "First access",
      },
      {
        ...commonTableCols.updatedAt,
        Header: "Last visited",
      },
      // {
      //   id: "completedAt",
      //   Header: "Completed at",
      //   accessor: "completedAt",
      //   Cell: ({ cell }) => {
      //     return cell.value ? dayjs(cell.value).format('Do MMMM YYYY [at] h:mm A') : noDataDash
      //   }
      // },

      // "visits": null,
      // "completed": null
      // {
      //   Header: "Roles",
      //   accessor: "roles[0].name", // accessor is the "key" in the data
      //   Cell: ({ cell }) => {
      //     return cell.row.original.node.roles.map(role => {
      //       return role.name
      //     }).join(', ')
      //   }
      // },
      {
        id: "actions",
        Header: "",
        hideOnCsv: true,
        width: 300,
        Cell: ({ cell }) => {
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

  const titleBreadcrumbs = [
    {
      text: 'Courses',
      link: '/admin/reports'
    }, 
    ...(course ? [{text: course?.title},{text: 'Users'}] : [])
  ]

  return (
    <ReportTable
      titleBreadcrumbs={titleBreadcrumbs}
      csvFilename={`Course ${course?.title} users report`}
      reportItemType="contentUser"
      tableData={tableData}
      tableCols={tableCols}
      loadingText="Loading course users"
      errorText="Unable to fetch course users."
      loading={loading}
      error={error}
      // groupFilter={true}
    />
  );
};

export default CourseUsersReportTable;
