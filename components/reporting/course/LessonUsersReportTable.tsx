import { useMemo } from "react";
import ItemWithImage from "../../common/cells/ItemWithImage";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "../../../utils/router";
import { User } from "@styled-icons/fa-solid/User";
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
              progress
              visits
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
        header: "Name",
        cell: ({ cell }) => {
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
        header: "Lesson status",
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

  return (
    <ReportTable
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
