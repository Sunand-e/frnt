import { useQuery } from "@apollo/client";
import { useMemo } from "react";
import ItemWithImage from "../../common/cells/ItemWithImage";
import { useRouter } from "../../../utils/router";
import { moduleTypes } from "../../courses/moduleTypes";
import { commonTableCols } from "../../../utils/commonTableCols";
import ReportTable from "../ReportTable";
import { USER_COURSE_REPORT } from "./USER_COURSE_REPORT";

const UserCourseReportTable = () => {
  const router = useRouter();

  const { user: userId, course: courseId } = router.query;

  const { loading, error, data } = useQuery(
    USER_COURSE_REPORT,
    {
      variables: {
        userId,
        where: { courseId },
      },
    }
  );
  const course = data?.user.courses.edges[0]?.node
  const orderedIds = course?.sections.reduce((arr: any, section: any) => {
    return [...arr, ...section.children.map((child: any) => child.id)]
  }, []);

  const modules = data && [
    ...(data?.user.lessons.edges ? data.user.lessons.edges : []),
    ...(data?.user.quizzes.edges ? data.user.quizzes.edges : []),
  ]

  const tableData = useMemo(() => modules ? (
    modules.sort((a, b) => orderedIds.indexOf(a.node.id) - orderedIds.indexOf(b.node.id))
  ) : [], [modules]);

  const tableCols = useMemo(
    () => [
      {
        id: "title",
        header: "Course module",
        accessorFn: (row: any) => row.node.title,
        cell: ({ cell }) => {
          const module = cell.row.original.node
          const moduleTypeName = module?.itemType === 'quiz' ?
            'quiz'
            : module?.contentType

          const moduleType = moduleTypes[moduleTypeName]
          const title = module ? (module.title || `Untitled ${moduleType?.label}`) : ''
          const IconComponent =
            moduleTypes[moduleTypeName]?.icon || null;

          const cellProps = {
            title,
            icon: !!IconComponent && (
              <IconComponent className="hidden w-6 h-full bg-grey-500 text-main-secondary" />
            ),
          };
          return <ItemWithImage {...cellProps} />;
        },
      },
      { ...commonTableCols.status },
      { ...commonTableCols.progress },
      {
        id: "score",
        header: "Score",
        accessorKey: "score",
        cell: ({ cell }) => {
          if (cell.row.original.status !== 'not_started' &&
            cell.row.original.status !== null && (
              cell.row.original.node.itemType === 'quiz' ||
              cell.row.original.node.contentType === 'scorm_assessment'
            )
          ) {
            return cell.getValue() || '0'
          } else {
            return <span>&mdash;</span>
          }
        }
      },
      commonTableCols.firstVisited,
      commonTableCols.lastVisited,
      {
        id: "actions",
        header: "",
        hideOnCsv: true,
        width: 300,
        cell: ({ cell }) => {
          const lessonId = cell.row.original.node?.id;
          const href = {
            query: {
              user: userId,
              course: courseId,
              ...(lessonId && { lesson: lessonId }),
            },
          };

          return (
            <div className="flex space-x-4 justify-center">
              {/* <ButtonLink href={href}>See details</ButtonLink> */}
            </div>
          );
        },
      },
    ],
    []
  );

  const courseNode = data?.user?.courses?.edges?.[0]?.node;

  return (
    <>
      <ReportTable
        simpleHeader={true}
        title={(
          <>
            <span className="font-semibold">Progress report </span>
            <span className="font-normal">for user: </span>
            <span className="font-semibold">{data?.user?.fullName} </span>
            <span className="font-normal">in course: </span>
            <span className="font-semibold">
              {courseNode?.title}
            </span>
          </>
        )}
        exportFilename={`User lessons for user ${data?.user?.fullName} in course ${courseNode?.title}`}
        tableData={tableData}
        tableCols={tableCols}
        loadingText="Loading lessons"
        errorText="Unable to fetch user's lessons."
        loading={loading}
        error={error}
      />
    </>
  );
};

export default UserCourseReportTable;
