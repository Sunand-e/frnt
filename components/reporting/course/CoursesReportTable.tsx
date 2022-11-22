import React, { useMemo } from "react";
import { useQuery, gql } from "@apollo/client";
import ButtonLink from "../../common/ButtonLink";
import ItemWithImage from "../../common/cells/ItemWithImage";
import ReportTable from "../ReportTable";
import { useRouter } from "../../../utils/router";

const COURSES_REPORT_QUERY = gql`
  query CoursesReportQuery {
    courses {
      edges {
        userId
        node {
          id
          title
          _deleted @client
          image {
            id
            location
          }
          tags {
            id
            label
          }
          users {
            totalCount
            edges {
              score
              status
              node {
                id
              }
            }
          }
        }
      }
    }
  }
`;
const CoursesReportTable = () => {
  const {
    loading,
    error,
    data: { courses: courses } = {},
  } = useQuery(COURSES_REPORT_QUERY);

  const router = useRouter()
  // Table data is memo-ised due to this:
  // https://github.com/tannerlinsley/react-table/issues/1994
  const tableData = useMemo(() => courses?.edges, [courses])

  const tableCols = useMemo(
    () => [
      {
        id: "title",
        Header: "Course",
        accessor: "node.title",
        Cell: ({ cell }) => {
          const cellProps = {
            image: cell.row.original.node.image,
            title: cell.value,
            secondary: cell.row.original.node.tags
              ?.map((tag) => tag.label)
              .join(", "),
            // secondary: cell.row.original.node.title,
            href: cell.row.original.node.id && {
              query: {
                course: cell.row.original.node.id,
                type: 'user',
              },
            },
          };
          return <ItemWithImage {...cellProps} />;
        },
      },
      {
        id: "enrolled",
        Header: "Enrolled users",
        accessor: "node.users.totalCount",
        Cell: ({ cell }) => cell.row.original.node.users?.totalCount,
      },
      {
        id: "not_started",
        Header: "Not started",
        accessor: (row) =>
          row.node.users.edges.filter(
            (contentUserEdge) =>
              !contentUserEdge?.status ||
              contentUserEdge.status === "not_started"
          ).length,
      },
      {
        id: "in_progress",
        Header: "In progress",
        accessor: (row) =>
          row.node.users.edges.filter(
            (contentUserEdge) => contentUserEdge.status === "in_progress"
          ).length,
      },
      {
        id: "completed",
        Header: "Completed",
        accessor: (row) =>
          row.node.users.edges.filter(
            (contentUserEdge) => contentUserEdge.status === "completed"
          ).length,
      },
      // {
      //   id: "avg_test_score",
      //   Header: "Avg. Test Score",
      // },
      {
        id: "percentage_complete",
        Header: "% Complete",
        accessor: (row) => {
          const totalCount = row.node.users.edges.length;
          const completedCount = row.node.users.edges.filter(
            (contentUserEdge) => contentUserEdge.status === "completed"
          ).length;
          const ratio = totalCount ? completedCount / totalCount : 0;

          return Math.round(ratio * 100) + "%";
        },
      },
      // {
      //   Header: "Categories",
      //   accessor: "tags",
      //   Cell: ({ cell }) => {
      //     const tagString = cell.row.original.node.tags?.map(tag => tag.label).join(', ')
      //     return (
      //       <span>{tagString}</span>
      //     )
      //   }
      // },
      {
        id: "actions",
        Header: "",
        hideOnCsv: true,
        width: 300,
        style: {
          width: "300px",
        },
        Cell: ({ cell }) => {
          const usersHref = cell.row.original.node.id && {
            query: {
              ...router.query,
              type: 'user',
              course: cell.row.original.node.id,
            },
          };

          const lessonsHref = cell.row.original.node.id && {
            query: {
              ...router.query,
              type: 'lesson',
              course: cell.row.original.node.id,
            },
          };

          return (
            <div className="flex space-x-4 justify-center">
              <ButtonLink href={usersHref}>View users</ButtonLink>
              {/* <ButtonLink href={lessonsHref}>View lessons</ButtonLink> */}
            </div>
          );
        },
      },
    ],
    []
  );

  return (
    <ReportTable
      csvFilename="Course report"
      simpleHeader={true}
      title={<>Courses</>}
      tableData={tableData}
      tableCols={tableCols}
      loadingText="Loading courses"
      errorText="Unable to fetch course report."
      loading={loading}
      error={error}
      filters={['group']}
    />
  );
};

export default CoursesReportTable;
