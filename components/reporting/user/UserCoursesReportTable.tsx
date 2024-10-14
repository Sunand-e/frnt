import { useCallback, useMemo } from "react";
import useGetUser from "../../../hooks/users/useGetUser";
import { useRouter } from "../../../utils/router";
import ButtonLink from "../../common/ButtonLink";
import ItemWithImage from "../../common/cells/ItemWithImage";
import { commonTableCols } from "../../../utils/commonTableCols";
import ReportTable, { filterActive, statusAccessor } from "../ReportTable";
import { ArrowBack } from "@styled-icons/boxicons-regular/ArrowBack";
import { gql, useQuery } from "@apollo/client";

// Define your GraphQL query, assuming it accepts a groupId variable
const GET_GROUP_COURSES = gql`
  query GetGroupCourses($groupId: ID!) {
    group(id: $groupId) {
      id
      assignedCourses {
        edges {
          node {
            id
          }
        }
      }
      provisionedCourses {
        edges {
          node {
            id
          }
        }
      }
    }
  }
`;
const UserCoursesReportTable = () => {
  const router = useRouter();
  const { 
    user: userId,
    group: groupId 
  } = router.query

  const { loading, error, user } = useGetUser(userId);
  // const { groups } = useGetGroups();
  
  const { loading: groupLoading, error: groupError, data: groupData } = useQuery(GET_GROUP_COURSES, {
    variables: { groupId },
    skip: !filterActive(groupId),
  });

  // Table data is memo-ised due to this:
  // https://github.com/tannerlinsley/react-table/issues/1994
  const tableData = useMemo(() => {
    let data = user?.courses?.edges.filter((edge) => !edge.node._deleted)
    if(filterActive(groupId) && groupData) {
      
      data = data?.filter(edge => {
        return groupData.group.assignedCourses.edges.map(edge => edge.node.id).includes(edge.node.id)
      })
    }

    return data || []
  }, [user, groupData, groupId]);

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
                ...router.query,
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
        accessorFn: statusAccessor,
      },
      commonTableCols.score,
      commonTableCols.firstVisited,
      commonTableCols.lastVisited,
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

  const backButton = (
    <ButtonLink
      href={{
        query: {
          ...router.query,
          type: 'user',
          user:null,
        }
      }}
    >
      <span className='block <FileExport className="w-5 mr-2 -ml-1'><ArrowBack width="20" /></span>
      <span className='hidden md:block'>Back to all users</span>
    </ButtonLink>
  )

  return (
    <ReportTable
      title={user ? `${user.fullName}'s courses` : ``}
      exportFilename={`User courses for ${user?.fullName}`}
      tableData={tableData}
      tableCols={tableCols}
      loadingText="Loading user's courses"
      errorText="Unable to fetch user's courses."
      loading={loading}
      error={error}
      filters={['group']}
      backButton={backButton}
      // groupFilter={true}
    />
  );
};

export default UserCoursesReportTable;
