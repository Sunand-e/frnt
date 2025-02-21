import React, { useCallback, useMemo } from "react";
import { useQuery, gql } from "@apollo/client";
import ButtonLink from "../../common/ButtonLink";
import ItemWithImage from "../../common/cells/ItemWithImage";
import ReportTable, { filterActive } from "../ReportTable";
import { useRouter } from "../../../utils/router";
import useUserHasCapability from "../../../hooks/users/useUserHasCapability";
import { client } from "../../../graphql/client";
import { GET_GROUP_USERS } from "./GET_GROUP_USERS";
import useGetCoursesReport from "../../../hooks/reports/useGetCoursesReport";

const CoursesReportTable = () => {
  const { courses, loading, error } = useGetCoursesReport({ pagination: true });

  const {
    loading: loadingGroups, error: errorGroups, data: { groups: groups } = {},
  } = useQuery(GET_GROUP_USERS);

  const router = useRouter()

  const {
    group: groupId,
  } = router.query

  const { userHasCapability, tenantLevelCapabilityArray } = useUserHasCapability()

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
    let data = courses?.edges.filter((edge: any) => !edge.node._deleted);
    if (filterActive(groupId)) {
      if (userHasCapability('GetAllGroupsContent')) {
        data = data?.filter((edge: any) => (
          edge.node.groupsAssigned.edges.some(({ node }) => node.id === groupId) ||
          edge.node.groupsProvisioned.edges.some(({ node }) => node.id === groupId)
        )
        )
      } else {
        data = data?.filter((item: any) => {
          const fragment = client.readFragment({
            id: `UserContentEdge:${item.userId}:${item.node.id}`,
            fragment: gql`
              fragment UserContentGroupFragment on UserContentEdge {
                groups {
                  edges {
                    node {
                      id
                    }
                  }
                }
              }
            `,
          });

          const groupIds = fragment?.groups.edges.map((edge: any) => edge.node.id);
          return groupIds?.some((id: any) => id === groupId);
        });
      }
    }
    return data || []

  }, [courses, groupId, tenantLevelCapabilityArray])

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
            // secondary: cell.row.original.node.title,
            href: cell.row.original.node.id && {
              query: {
                ...router.query,
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
    />
  );
};

export default CoursesReportTable;