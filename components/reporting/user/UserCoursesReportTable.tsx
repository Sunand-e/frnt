import { useCallback, useMemo } from "react";
import useGetUser from "../../../hooks/users/useGetUser";
import { useRouter } from "../../../utils/router";
import ButtonLink from "../../common/ButtonLink";
import ItemWithImage from "../../common/cells/ItemWithImage";
import { commonTableCols } from "../../../utils/commonTableCols";
import ReportTable, { filterActive } from "../ReportTable";
import useGetGroups from "../../../hooks/groups/useGetGroups";

const UserCoursesReportTable = () => {
  const router = useRouter();
  const { 
    user: userId,
    group: groupId 
  } = router.query

  const { loading, error, user } = useGetUser(userId);
  const { groups } = useGetGroups();

  // Table data is memo-ised due to this:
  // https://github.com/tannerlinsley/react-table/issues/1994
  const tableData = useMemo(() => {
    let data = groups && user?.courses?.edges.filter((edge) => !edge.node._deleted)
    if(filterActive(groupId) && groups) {
      let groupEdge = groups.edges.find(({node}) => node.id === groupId)
      data = data?.filter(edge => {
        return groupEdge.node.assignedCourses.edges.map(edge => edge.node.id).includes(edge.node.id)
      })
    }

    return data || []
  }, [user, groups, groupId]);

  const tableCols = useMemo(() => {
    return [
      {
        id: "title",
        header: "Course",
        accessorFn: row => row.node.title, // accessor is the key in the data
        cell: ({ cell }) => {
          const course = cell.row.original.node;
          const cellProps = {
            title: course?.title,
            image: course?.image,
            // secondary: JSON.stringify(cell.row.original),
            href: course?.id && {
              query: {
                course: course?.id,
                user: userId,
              },
            },
          };
          return <ItemWithImage {...cellProps} />;
        },
      },
      // {
      //   id: 'role',
      //   header: "Role",
      //   cell: ({ cell }) => {
      //     const content = cell.row.original.node.roles;
      //     return (
      //       <pre>
      //       { JSON.stringify(content,null,2) }
      //       </pre>
      //     )
      //   }
      // },
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
      {
        id: "actions",
        header: "",
        hideOnCsv: true,
        width: 300,
        // className: 'text-center',
        cell: ({ cell }) => {
          const course = cell.row.original.node;
          const href = {
            query: {
              ...(course.id && { course: course.id }),
              user: userId,
            },
          };
          return (
            <div className="space-x-4">
              <ButtonLink href={href}>See details</ButtonLink>
            </div>
          );
        },
      },
    ];
  }, []);

  return (
    <ReportTable
      title={user ? `${user.fullName}'s courses` : ``}
      csvFilename={`User courses for ${user?.fullName}`}
      tableData={tableData}
      tableCols={tableCols}
      loadingText="Loading user's courses"
      errorText="Unable to fetch user's courses."
      loading={loading}
      error={error}
      filters={['group']}
      // groupFilter={true}
    />
  );
};

export default UserCoursesReportTable;
