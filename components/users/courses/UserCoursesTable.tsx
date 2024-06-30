import { useMemo } from "react";
import useGetUser from "../../../hooks/users/useGetUser";
import { useRouter } from '../../../utils/router';
import ItemWithImage from "../../common/cells/ItemWithImage";
import Table from "../../common/tables/Table";
import UserCourseActionsMenu from "./UserCourseActionsMenu";

const UserCoursesTable = ({scrollInTable = false}) => {
  
  const router = useRouter()
  const { id } = router.query

  const { loading, error, user } = useGetUser(id)
  
  // const {enrolUsersInContent} = useEnrolUsersInContent()

  // const handleChangeRole = useCallback((content, role) => {
  //   if(!user?.id) {
  //     return false
  //   }
  //   enrolUsersInContent({
  //     userIds: [user.id],
  //     contentItemIds: [content.node.id],
  //     roleId: role.id
  //   })
  // }, [user])
  
  const tableData = useMemo(
    () => {
      return user?.courses.edges.filter(edge => (
        !edge.node._deleted
         && (
          edge.groups.edges.some(edge => edge.roles.length) || 
          edge.roles.length
        )
      )) || []
    },
    [user]
  );
  
  const tableCols = useMemo(() => {
    return [
      {
        header: "Course",
        accessorFn: row => row.node.title,
        cell: ({ cell }) => {
          const course = cell.row.original.node;
          return (
            <ItemWithImage
              title={course.title}
              image={course.image}
            />
          )
        }
      },
      // {
      //   header: "Role",
      //   cell: ({ cell }) => {
      //     const content = cell.row.original;
      //     const handleChange = role => handleChangeRole(content, role);
      //     return (
      //       <UserRoleSelectCell onChange={handleChange} cell={cell} roleType={'content_item_role'} />
      //     )
      //   }
      // },
      {
        id: "AssignmentStatus",
        header: "Status",
        cell: ({ cell }) => {
          const values = cell.row.original;
          return (
            <div className="text-center line-clamp-2">
              { cell.row.original.groups.edges.length ? (
                <>
                  Assigned via group:
                  <strong> {cell.row.original.groups.edges.map(edge => edge.node.name).join(', ')}
                  </strong>
                </>
              ) : (
                'Assigned'
              )}
            </div>
          )
        }
      },
      {
        header: "Actions",
        accessorKey: "actions",
        cell: ({ cell }) => <UserCourseActionsMenu user={user} course={cell.row.original} />
      },
    ]
  }, []);

  const tableProps = {
    tableData,
    tableCols,
    scrollInTable,
    showTop: false
  }
    
  return (
    <Table { ...tableProps } />
  );
}

export default UserCoursesTable