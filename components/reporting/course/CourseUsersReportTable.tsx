import React, { useMemo } from "react";
import ButtonLink from "../../common/ButtonLink";
import ItemWithImage from "../../common/cells/ItemWithImage";
import useGetCourseUsers from "../../../hooks/courses/useGetCourseUsers";
import { useRouter } from "../../../utils/router";
import dayjs from "dayjs";
import { User } from "@styled-icons/fa-solid/User";
import ReportTable, { filterActive } from "../ReportTable";
import { commonTableCols } from "../../../utils/commonTableCols";
import { ArrowBack } from "@styled-icons/boxicons-regular/ArrowBack";
import useGetGroupsUsers from "../../../hooks/groups/useGetGroupsUsers";
var advancedFormat = require("dayjs/plugin/advancedFormat");
dayjs.extend(advancedFormat);

const CourseUsersReportTable = () => {
  const router = useRouter();
  const {
    course: courseId,
    group: groupId
  } = router.query

  const { groups } = useGetGroupsUsers();
  const { loading, error, userConnection, course } = useGetCourseUsers(courseId);

  // Table data is memo-ised due to this:
  // https://github.com/tannerlinsley/react-table/issues/1994
  const tableData = useMemo(() => {
    let data = userConnection?.edges
    if (filterActive(groupId) && groups) {
      let groupEdge = groups.edges.find(({ node }) => node.id === groupId)
      data = data?.filter(edge => {
        return groupEdge.node.users.edges.map((edge: any) => edge.node.id).includes(edge.node.id)
      })
    }
    return data || []
  }, [userConnection, groups, groupId]);

  const tableCols = useMemo(
    () => [
      {
        id: "name",
        header: "Name",
        accessorFn: (row: any) => row.node.fullName,
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
                course: courseId,
                user: cell.row.original.node.id,
              },
            },
          };
          return <ItemWithImage {...cellProps} />;
        },
      },
      commonTableCols.status,
      commonTableCols.progress,
      commonTableCols.score,
      commonTableCols.firstVisited,
      commonTableCols.lastVisited,

      {
        id: "actions",
        header: "",
        hideOnCsv: true,
        width: 300,
        cell: ({ cell }) => {
          const userId = cell.row.original.node.id;
          const href = {
            query: {
              course: courseId,
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

  const backButton = (
    <ButtonLink
      href={{
        query: {
          ...router.query,
          type: 'course',
          course: null,
        }
      }}
    >
      <span className='block <FileExport className="w-5 mr-2 -ml-1'><ArrowBack width="20" /></span>
      <span className='hidden md:block'>Back to all courses</span>
    </ButtonLink>
  )

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
      exportFilename={`Course users for ${course?.title}`}
      tableData={tableData}
      tableCols={tableCols}
      loadingText="Loading course users"
      errorText="Unable to fetch course users."
      loading={loading}
      error={error}
      filters={['group']}
      backButton={backButton}
    />
  );
};

export default CourseUsersReportTable;
