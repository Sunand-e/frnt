import { useQuery } from "@apollo/client";
import React, { useMemo } from "react";
import { GET_USERS_COURSES } from "../../../graphql/queries/users";
import { GetUsers } from "../../../graphql/queries/__generated__/GetUsers";
import ButtonLink from "../../common/ButtonLink";
import ItemWithImage from "../../common/cells/ItemWithImage";
import { User } from "@styled-icons/fa-solid/User";
import ReportTable from "../ReportTable";
import { useRouter } from "../../../utils/router";

const UsersReportTable = () => {
  const {
    loading,
    error,
    data: queryData,
  } = useQuery<GetUsers>(GET_USERS_COURSES);

  
  const router = useRouter()
  // Table data is memo-ised due to this:
  // https://github.com/tannerlinsley/react-table/issues/1994
  const tableData = useMemo(() => queryData?.users?.edges || [], [queryData]);

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
        accessorFn: row => row.node.courses.totalCount,
        header: "Courses Enrolled",
      },
      {
        id: "not_started",
        header: "Not started",
        accessorFn: row =>
          row.node.courses.edges.filter(
            (userContentEdge) =>
              !userContentEdge?.status ||
              userContentEdge.status === "not_started"
          ).length,
      },
      {
        id: "in_progress",
        header: "In progress",
        accessorFn: row =>
          row.node.courses.edges.filter(
            (userContentEdge) => userContentEdge.status === "in_progress"
          ).length,
      },
      {
        id: "completed",
        header: "Completed",
        accessorFn: row =>
          row.node.courses.edges.filter(
            (userContentEdge) => userContentEdge.status === "completed"
          ).length,
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
    []
  )
    
  return (
    <ReportTable
      tableData={tableData}
      tableCols={tableCols}
      loadingText="Loading users"
      errorText="Unable to fetch users."
      loading={loading}
      error={error}
      // filters={['group','course']}
      filters={['group']}
      simpleHeader={true}
      title={<>Users</>}
    />
  );

};

export default UsersReportTable;
