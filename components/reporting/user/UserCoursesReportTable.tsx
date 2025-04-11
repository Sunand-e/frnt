import { useMemo } from "react";
import useGetUser from "../../../hooks/users/useGetUser";
import { useRouter } from "../../../utils/router";
import ButtonLink from "../../common/ButtonLink";
import ItemWithImage from "../../common/cells/ItemWithImage";
import { commonTableCols } from "../../../utils/commonTableCols";
import ReportTable, { statusAccessor } from "../ReportTable";
import { ArrowBack } from "@styled-icons/boxicons-regular/ArrowBack";
import { GET_USER_WITH_COURSES } from "../../../graphql/queries/userDetails";
import { GraduationCap } from "@styled-icons/fa-solid/GraduationCap";

const UserCoursesReportTable = () => {
  const router = useRouter();
  const {
    user: userId,
    group: groupId
  } = router.query

  const { loading, error, user, loadingMore } = useGetUser(userId as string, GET_USER_WITH_COURSES, true, {where: { groupId: groupId } });

  const tableData = useMemo(() => {
    return user?.courses?.edges.filter((edge) => !edge.node._deleted) || []
  }, [user]);

  const tableCols = useMemo(() => {
    return [
      {
        id: "title",
        header: "Course",
        accessorFn: (row: any) => row.node.title,
        cell: ({ cell }) => {
          const course = cell.row.original.node;
          const cellProps = {
            title: course?.title,
            image: course?.image,
            href: course?.id && {
              query: {
                ...router.query,
                course: course?.id,
                user: userId,
              },
            },
            icon: (<GraduationCap className="p-1" />)
          };
          return <ItemWithImage {...cellProps} />;
        },
      },
      {
        id: "status",
        header: "Status",
        accessorKey: "status",
        accessorFn: statusAccessor,
      },
      commonTableCols.score,
      commonTableCols.firstVisited,
      commonTableCols.lastVisited,
      {
        id: "actions",
        header: "",
        hideOnCsv: true,
        width: 300,
        // className: 'text-center',
        cell: ({ cell }) => {
          const course = cell.row.original.node;
          const href = {
            query: {
              ...(course.id && { course: course.id }),
              user: userId,
            },
          };
          return (
            <div className="space-x-4">
              <ButtonLink href={href}>See details</ButtonLink>
            </div>
          );
        },
      },
    ];
  }, []);

  const backButton = (
    <ButtonLink
      href={{
        query: {
          ...router.query,
          type: 'user',
          user: null,
        }
      }}
    >
      <span className='block <FileExport className="w-5 mr-2 -ml-1'><ArrowBack width="20" /></span>
      <span className='hidden md:block'>Back to all users</span>
    </ButtonLink>
  )

  return (
    <ReportTable
      title={user ? `${user.fullName}'s courses` : ``}
      exportFilename={`User courses for ${user?.fullName}`}
      tableData={tableData}
      tableCols={tableCols}
      loadingText="Loading user's courses"
      errorText="Unable to fetch user's courses."
      loading={loading}
      error={error}
      filters={['group']}
      backButton={backButton}
      isLoadingMore={loadingMore}
    />
  );
};

export default UserCoursesReportTable;
