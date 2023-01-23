import React, { useCallback, useMemo } from "react";
import { useQuery, gql } from "@apollo/client";
import ButtonLink from "../../common/ButtonLink";
import ItemWithImage from "../../common/cells/ItemWithImage";
import ReportTable from "../ReportTable";
import { useRouter } from "../../../utils/router";
import useUserHasCapability from "../../../hooks/users/useUserHasCapability";
import { client } from "../../../graphql/client";

const COURSES_REPORT_QUERY = gql`
  query CoursesReportQuery {
    courses {
      edges {
        groups {
          edges {
            node {
              id
              name
            }
          }
        }
        userId
        node {
          id
          title
          groupsEnrolled {
            edges {
              node {
                id
              }
            }
          }
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
    groups {
      edges {
        node {
          id
          users {
            edges {
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
    data: { courses: courses, groups: groups } = {},
  } = useQuery(COURSES_REPORT_QUERY);

  const router = useRouter()

  const { 
    group: groupId, 
  } = router.query

  const { userHasCapability, userCapabilityArray } = useUserHasCapability()

  const filterActive = (filterVal) => {
    return filterVal && filterVal !== 'all'
  }

  const applyGroupFilter = useCallback((edges) => {
    let filteredEdges = edges;
    if(filterActive(groupId) && groups) {
      let groupEdge = groups.edges.find(({node}) => node.id === groupId)
      filteredEdges = edges.filter(edge => {
        return groupEdge.node.users.edges.map(edge => edge.node.id).includes(edge.node.id)
      })
    }
    return filteredEdges
  },[groups, groupId])

  // Table data is memo-ised due to this:
  // https://github.com/tannerlinsley/react-table/issues/1994
  const tableData = useMemo(() => {
    let data = courses?.edges.filter((edge) => !edge.node._deleted);

    if (filterActive(groupId)) {
      if(userHasCapability('GetAllGroupsContent')) {
        data = data?.filter(edge => edge.node.groupsEnrolled.edges.some(({node}) => node.id === groupId))
      } else {
        data = data?.filter((item) => {
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
          const groupIds = fragment?.groups.edges.map((edge) => edge.node.id);
          return groupIds?.some((id) => id === groupId);
        });
      }
    }

    return data || []

  }, [courses,groupId, userCapabilityArray])

  const tableCols = useMemo(
    () => [
      {
        id: "title",
        header: "Course",
        accessorFn: row => row.node.title,
        cell: ({ cell }) => {
          const cellProps = {
            image: cell.row.original.node.image,
            title: cell.getValue(),
            secondary: cell.row.original.node.tags
              ?.map((tag) => tag.label)
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
        accessorFn: row => applyGroupFilter(row.node.users.edges).length
      },
      {
        id: "not_started",
        header: "Not started",
        accessorFn: (row) => (
          applyGroupFilter(row.node.users.edges).filter(contentUserEdge => (
            !contentUserEdge?.status || contentUserEdge.status === "not_started"
          )).length
        )
      },
      {
        id: "in_progress",
        header: "In progress",
        accessorFn: row => (
          applyGroupFilter(row.node.users.edges).filter(
            contentUserEdge => contentUserEdge.status === "in_progress"
          ).length
        )
      },
      {
        id: "completed",
        header: "Completed",
        accessorFn: row => (
          applyGroupFilter(row.node.users.edges).filter(
            contentUserEdge => contentUserEdge.status === "completed"
          ).length
        )
      },
      // {
      //   id: "avg_test_score",
      //   header: "Avg. Test Score",
      // },
      {
        id: "percentage_complete",
        header: "% Complete",
        accessorFn: row => {
          const totalCount = row.node.users.edges.length;
          const completedCount = row.node.users.edges.filter(
            (contentUserEdge) => contentUserEdge.status === "completed"
          ).length;
          const ratio = totalCount ? completedCount / totalCount : 0;

          return Math.round(ratio * 100) + "%";
        },
      },
      // {
      //   header: "Categories",
      //   accessorKey: "tags",
      //   cell: ({ cell }) => {
      //     const tagString = cell.row.original.node.tags?.map(tag => tag.label).join(', ')
      //     return (
      //       <span>{tagString}</span>
      //     )
      //   }
      // },
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
              {/* <ButtonLink href={lessonsHref}>View lessons</ButtonLink> */}
            </div>
          );
        },
      },
    ],
    [groups, groupId]
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
