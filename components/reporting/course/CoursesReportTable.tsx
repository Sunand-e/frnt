import React, { useCallback, useMemo } from "react";
import { gql } from "@apollo/client";
import ButtonLink from "../../common/ButtonLink";
import ItemWithImage from "../../common/cells/ItemWithImage";
import ReportTable, { filterActive } from "../ReportTable";
import { useRouter } from "../../../utils/router";
import useGetCoursesReport from "../../../hooks/reports/useGetCoursesReport";
import useGetGroupsUsers from "../../../hooks/groups/useGetGroupsUsers";
import { GraduationCap } from "@styled-icons/fa-solid/GraduationCap"

const CoursesReportTable = () => {
  const { groups } = useGetGroupsUsers();
  const router = useRouter()
  const { group: groupId } = router.query;

  const { courses, loading, error, loadingMore } = useGetCoursesReport({
    pagination: true,
    groupId: groupId || null,
  });

  const applyGroupFilter = useCallback((edges: any) => {
    let filteredEdges = edges;
    if (filterActive(groupId) && groups) {
      let groupEdge = groups.edges.find(({ node }) => node.id === groupId)
      filteredEdges = edges.filter((edge: any) => {
        return groupEdge.node.users.edges.map((edge: any) => edge.node.id).includes(edge.node.id)
      })
    }
    return filteredEdges
  }, [groups, groupId])

  const tableData = useMemo(() => {
    return courses?.edges.filter((edge: any) => !edge.node._deleted) || [];
  }, [courses]);

  const tableCols = useMemo(
    () => [
      {
        id: "title",
        header: "Course",
        accessorFn: (row: any) => row.node.title,
        cell: ({ cell }) => {
          const cellProps = {
            image: cell.row.original.node.image,
            title: cell.getValue(),
            secondary: cell.row.original.node.tags.edges
              ?.map(({ node }) => node.label)
              .join(", "),
            href: cell.row.original.node.id && {
              query: {
                ...router.query,
                course: cell.row.original.node.id,
                type: 'user',
              },
            },
            icon: <GraduationCap className="p-1" />,
          };
          return <ItemWithImage {...cellProps} />;
        },
      },
      {
        id: "enrolled",
        header: "Enrolled users",
        accessorFn: (row: any) => applyGroupFilter(row.node.users.edges).length
      },
      {
        id: "not_started",
        header: "Not started",
        accessorFn: (row: any) => (
          applyGroupFilter(row.node.users.edges).filter((contentUserEdge: any) => (
            !contentUserEdge?.status || contentUserEdge.status === "not_started"
          )).length
        )
      },
      {
        id: "in_progress",
        header: "In progress",
        accessorFn: (row: any) => (
          applyGroupFilter(row.node.users.edges).filter(
            (contentUserEdge: any) => contentUserEdge.status === "in_progress"
          ).length
        )
      },
      {
        id: "completed",
        header: "Completed",
        accessorFn: (row: any) => (
          applyGroupFilter(row.node.users.edges).filter(
            (contentUserEdge: any) => contentUserEdge.status === "completed"
          ).length
        )
      },
      {
        id: "percentage_complete",
        header: "% Complete",
        accessorFn: (row: any) => {
          const totalCount = row.node.users.edges.length;
          const completedCount = row.node.users.edges.filter(
            (contentUserEdge: any) => contentUserEdge.status === "completed"
          ).length;
          const ratio = totalCount ? completedCount / totalCount : 0;

          return Math.round(ratio * 100) + "%";
        },
      },
      {
        id: "actions",
        header: "",
        hideOnCsv: true,
        width: 300,
        style: {
          width: "300px",
        },
        cell: ({ cell }) => {
          const usersHref = cell.row.original.node.id && {
            query: {
              ...router.query,
              type: 'user',
              course: cell.row.original.node.id,
            },
          };

          return (
            <div className="flex space-x-4 justify-center">
              <ButtonLink href={usersHref}>View users</ButtonLink>
            </div>
          );
        },
      },
    ],
    [groups, groupId]
  );
  return (
    <ReportTable
      exportFilename="Course report"
      simpleHeader={true}
      title={<>Courses</>}
      tableData={tableData}
      tableCols={tableCols}
      loadingText="Loading courses"
      errorText="Unable to fetch course report."
      loading={loading}
      error={error}
      filters={['group']}
      isLoadingMore={loadingMore}
    />
  );
};

export default CoursesReportTable;