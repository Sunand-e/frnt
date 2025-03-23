import { useQuery } from "@apollo/client";
import React, { useCallback, useMemo, useState } from "react";
import ButtonLink from "../../common/ButtonLink";
import ItemWithImage from "../../common/cells/ItemWithImage";
import { User } from "@styled-icons/fa-solid/User";
import ReportTable, { filterActive } from "../ReportTable";
import { useRouter } from "../../../utils/router";
import { GetUsersCoursesQuery } from "../../../graphql/generated";
import { GET_USERS_COURSES } from "../../../graphql/queries/GET_USERS_COURSES";
import { ITEMS_PER_PAGE } from "../../../utils/constants";
import useInfiniteScroll from "../../../hooks/useInfiniteScroll";
import useGetGroupsUsers from "../../../hooks/groups/useGetGroupsUsers";

const UsersReportTable = () => {
  const [loadingMore, setLoadingMore] = useState(false);
  const { loading, error, data: queryData, fetchMore, networkStatus} = useQuery<GetUsersCoursesQuery>(GET_USERS_COURSES, {
    variables: { first: ITEMS_PER_PAGE, after: null },
    fetchPolicy: "cache-first",
    notifyOnNetworkStatusChange: true
  });

  const loadMore = () => {
    if (loading || !queryData?.users?.pageInfo?.hasNextPage) return;

    setLoadingMore(true);
    fetchMore({
      variables: { after: queryData.users.pageInfo.endCursor },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        setLoadingMore(false);
        if (!fetchMoreResult?.users || prevResult.users.pageInfo.endCursor == fetchMoreResult.users.pageInfo.endCursor) return prevResult;

        return {
          users: {
            ...fetchMoreResult.users,
            edges: [...prevResult.users.edges, ...fetchMoreResult.users.edges],
            pageInfo: fetchMoreResult.users.pageInfo,
          },
        };
      },
    }).catch(_error => setLoadingMore(false));
  };

  useInfiniteScroll(loadMore, true);

  const incialLoading = networkStatus != 3 && networkStatus != 7;

  const { groups } = useGetGroupsUsers();

  const router = useRouter()

  const { group: groupId } = router.query

  const applyGroupFilter = useCallback((edges: any) => {
    let filteredEdges = edges;
    if (filterActive(groupId) && groups) {
      let groupEdge = groups.edges.find(({ node }) => node.id === groupId)
      filteredEdges = edges.filter((edge: any) => {
        return groupEdge.node.assignedCourses.edges.map((edge: any) => edge.node.id).includes(edge.node.id)
      })
    }
    return filteredEdges
  }, [groups, groupId])

  const tableData = useMemo(() => {
    let data = queryData?.users?.edges
    if (filterActive(groupId)) {
      data = data?.filter((item) => {
        return item.node.groups.edges.some(
          (groupEdge) => groupEdge.node.id === groupId
        );
      });
    }
    return data || []
  }, [queryData, groupId]);

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
              <User className="p-1" />
            ),
            title: cell.row.original.node.fullName,
            secondary: cell.row.original.node.email,
            href: cell.row.original.node.id && {
              query: {
                ...router.query,
                user: cell.row.original.node.id,
              },
            },
          };
          return (
            <ItemWithImage
              placeholder="/images/user-generic.png"
              {...cellProps}
            />
          );
        },
      },
      {
        id: "enrolled",
        header: "Courses Enrolled",
        accessorFn: (row: any) => applyGroupFilter(row.node.courses.edges).length
      },
      {
        id: "not_started",
        header: "Not started",
        accessorFn: (row: any) => (
          applyGroupFilter(row.node.courses.edges).filter(
            (edge: any) => !edge?.status || edge.status === "not_started"
          ).length
        )
      },
      {
        id: "in_progress",
        header: "In progress",
        accessorFn: (row: any) => (
          applyGroupFilter(row.node.courses.edges).filter(
            (edge: any) => edge.status === "in_progress"
          ).length
        )
      },
      {
        id: "completed",
        header: "Completed",
        accessorFn: (row: any) => (
          applyGroupFilter(row.node.courses.edges).filter(
            (edge: any) => edge.status === "completed"
          ).length
        )
      },
      {
        id: "actions",
        header: "",
        hideOnCsv: true,
        width: 300,
        // className: 'text-center',
        cell: ({ cell }) => {
          const coursesHref = cell.row.original.node.id && {
            query: {
              ...router.query,
              type: 'course',
              user: cell.row.original.node.id,
            },
          };

          return (
            <div className="flex space-x-4 justify-center">
              <ButtonLink href={coursesHref}>View courses</ButtonLink>
            </div>
          );
        },
      },
    ],
    [groups, groupId]
  )

  return (
    <ReportTable
      tableData={tableData}
      tableCols={tableCols}
      loadingText="Loading users"
      errorText="Unable to fetch users."
      loading={incialLoading}
      error={error}
      exportFilename={'users'}
      filters={['group']}
      simpleHeader={true}
      title={<>Users</>}
      isLoadingMore={loadingMore}
    />
  );

};

export default UsersReportTable;
