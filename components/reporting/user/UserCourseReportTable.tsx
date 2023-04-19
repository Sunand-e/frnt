import { gql, useQuery } from "@apollo/client";
import { useMemo } from "react";
import ItemWithImage from "../../common/cells/ItemWithImage";
import { useRouter } from "../../../utils/router";
import { moduleTypes } from "../../courses/moduleTypes";
import { commonTableCols } from "../../../utils/commonTableCols";
import ReportTable from "../ReportTable";

const UserCourseReportTable = () => {
  const router = useRouter();

  const { user: userId, course: courseId } = router.query;

  const { loading, error, data } = useQuery(
    gql`
      query getUsersLessons($userId: ID!, $where: JSON) {
        user(id: $userId) {
          fullName
          courses(where: $where) {
            nodes {
              id
              title
            }
          }
          lessons(where: $where) {
            edges {
              node {
                id
                title
                contentType
              }
              status
              lastVisited
              firstVisited
              createdAt
              updatedAt
              score
              visits
              completed
            }
            totalCount
          }
        }
      }
    `,
    {
      variables: {
        userId,
        where: { courseId },
      },
    }
  );

  // Table data is memo-ised due to this:
  // https://github.com/tannerlinsley/react-table/issues/1994
  const tableData = useMemo(() => {
    const lessons = data?.user?.lessons.edges;
    return lessons;
  }, [data]);

  const tableCols = useMemo(
    () => [
      {
        id: "title",
        header: "Lesson",
        accessorFn: row => row.node.title,
        cell: ({ cell }) => {
          const IconComponent =
            moduleTypes[cell.row.original.node?.contentType]?.icon || null;
          const cellProps = {
            title: cell.row.original.node?.title,
            icon: !!IconComponent && (
              <IconComponent className="hidden w-6 h-full bg-grey-500 text-main-secondary" />
            ),
          };
          return <ItemWithImage {...cellProps} />;
        },
      },
      {
        id: "status",
        header: "Status",
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

      // "visits": null,
      // "completed": null
      // {
      //   header: "Roles",
      //   accessorFn: row => row.roles[0].name, // accessor is the key in the data
      //   cell: ({ cell }) => {
      //     return cell.row.original.roles.map(role => {
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

  const courseNode = data?.user?.courses?.nodes?.[0];

  // const titleBreadcrumbs = [
  //   {
  //     text: "Courses",
  //     link: "/admin/reports",
  //   },
  //   ...(courseNode && data
  //     ? [
  //         {
  //           text: courseNode?.title,
  //           link: { query: { course: courseNode?.id } },
  //         },
  //         { text: data?.user?.fullName },
  //       ]
  //     : []),
  // ];

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
