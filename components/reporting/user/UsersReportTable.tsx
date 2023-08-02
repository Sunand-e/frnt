import { useQuery } from "@apollo/client";
import React, { useCallback, useMemo } from "react";
// import { GET_USERS_COURSES } from "../../../graphql/queries/users";
import ButtonLink from "../../common/ButtonLink";
import ItemWithImage from "../../common/cells/ItemWithImage";
import { User } from "@styled-icons/fa-solid/User";
import ReportTable, { filterActive } from "../ReportTable";
import { useRouter } from "../../../utils/router";
import { GetUsersCoursesQuery } from "../../../graphql/generated";
import { GET_USERS_COURSES } from "../../../graphql/queries/GET_USERS_COURSES";

const UsersReportTable = () => {
  const {
    loading,
    error,
    data: queryData,
  } = useQuery<GetUsersCoursesQuery>(GET_USERS_COURSES);

  const groups = queryData?.groups
  const router = useRouter()

  const { group: groupId } = router.query

  const applyGroupFilter = useCallback((edges) => {
    let filteredEdges = edges;
    if(filterActive(groupId) && groups) {
      let groupEdge = groups.edges.find(({node}) => node.id === groupId)
      filteredEdges = edges.filter(edge => {
        return groupEdge.node.assignedCourses.edges.map(edge => edge.node.id).includes(edge.node.id)
      })
    }
    return filteredEdges
  },[groups, groupId])

  // Table data is memo-ised due to this:
  // https://github.com/tannerlinsley/react-table/issues/1994
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
  }, [queryData,groupId]);

  const tableCols = useMemo(
    () => [
      {
        id: "name",
        header: "Name",
        accessorFn: row => row.node.fullName,
        cell: ({ cell }) => {
          const cellProps = {
            imageSrc: cell.row.original.node.profileImageUrl,
            icon: (
              <User className="hidden w-auto h-full bg-grey-500 text-main-secondary text-opacity-50" />
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
      // {
      //   header: "JSON",
      //   cell: ({ cell }) => (
      //     <pre className='text-left'>
      //       {JSON.stringify(cell.row.original.node,null,2)}
      //     </pre>
      //   ),
      //   className: 'text-left'
      // },
      {
        id: "enrolled",
        header: "Courses Enrolled",
        accessorFn: row => applyGroupFilter(row.node.courses.edges).length
      },
      {
        id: "not_started",
        header: "Not started",
        accessorFn: (row) => (
          applyGroupFilter(row.node.courses.edges).filter(
            edge => !edge?.status || edge.status === "not_started"
          ).length
        )
      },
      {
        id: "in_progress",
        header: "In progress",
        accessorFn: row => (
          applyGroupFilter(row.node.courses.edges).filter(
            edge => edge.status === "in_progress"
          ).length
        )
      },
      {
        id: "completed",
        header: "Completed",
        accessorFn: row => (
          applyGroupFilter(row.node.courses.edges).filter(
            edge => edge.status === "completed"
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

          const groupsHref = cell.row.original.node.id && {
            query: {
              ...router.query,
              type: 'group',
              user: cell.row.original.node.id,
            },
          };

          return (
            <div className="flex space-x-4 justify-center">
              <ButtonLink href={coursesHref}>View courses</ButtonLink>
              {/* <ButtonLink href={groupsHref}>View groups</ButtonLink> */}
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
      loading={loading}
      error={error}
      exportFilename={'users'}
      // filters={['group','course']}
      filters={['group']}
      simpleHeader={true}
      title={<>Users</>}
    />
  );

};

export default UsersReportTable;
