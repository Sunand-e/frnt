import { useMemo } from "react";
import ItemWithImage from "../../common/cells/ItemWithImage";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "../../../utils/router";
import { User } from "styled-icons/fa-solid";
import dayjs from "dayjs";
import { commonTableCols } from "../../../utils/commonTableCols";
import ReportTable from "../ReportTable";
var advancedFormat = require("dayjs/plugin/advancedFormat");
dayjs.extend(advancedFormat);

const LessonUsersReportTable = () => {
  const router = useRouter();

  const { lesson: lessonId, course: courseId } = router.query;

  const { loading, error, data } = useQuery(
    gql`
      query getLessonsUsers($lessonId: ID!) {
        lesson(id: $lessonId) {
          title
          users {
            edges {
              node {
                id
                fullName
                email
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
        lessonId,
      },
    }
  );

  // Table data is memo-ised due to this:
  // https://github.com/tannerlinsley/react-table/issues/1994
  const tableData = useMemo(() => {
    const users = data?.lesson?.users.edges;
    return users || [];
  }, [data]);

  const tableCols = useMemo(
    () => [
      {
        id: "name",
        Header: "Name",
        Cell: ({ cell }) => {
          const user = cell.row.original.node;
          const cellProps = {
            title: user.fullName,
            secondary: user.email,
            imageSrc: cell.row.original.profileImageUrl,
            icon: (
              <User className="hidden w-auto h-full bg-grey-500 text-main-secondary text-opacity-50" />
            ),
          };
          return <ItemWithImage {...cellProps} />;
        },
      },
      {
        id: "status",
        Header: "Lesson status",
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

      // "visits": null,
      // "completed": null
      // {
      //   Header: "Roles",
      //   accessor: "roles[0].name", // accessor is the "key" in the data
      //   Cell: ({ cell }) => {
      //     return cell.row.original.roles.map(role => {
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
              lesson: lessonId,
              course: courseId,
              ...(userId && { user: userId }),
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

  const titleBreadcrumbs = [
    {
      text: "Courses",
      link: "/admin/reports",
    },
    ...(data ? [{ text: data?.lesson?.title }, { text: "Users" }] : []),
  ];

  data?.lesson?.title;
  return (
    <ReportTable
      titleBreadcrumbs={titleBreadcrumbs}
      reportItemType="contentUser"
      tableData={tableData}
      tableCols={tableCols}
      loadingText="Loading users"
      errorText="Unable to fetch users for this lesson."
      loading={loading}
      error={error}
      // groupFilter={true}
    />
  );
};

export default LessonUsersReportTable;
