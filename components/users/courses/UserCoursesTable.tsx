import { useCallback, useContext, useMemo } from "react";
import useGetUser from "../../../hooks/users/useGetUser";
import Table from "../../common/tables/Table";
import { useRouter } from '../../../utils/router';
import Button from "../../common/Button";
import ItemWithImage from "../../common/cells/ItemWithImage";
import Select from "react-select";
import UserRoleSelectCell from "../groups/UserRoleSelectCell";
import useEnrolUsersInContent from "../../../hooks/contentItems/useEnrolUsersInContent";
import useUnenrolUserFromContent from "../../../hooks/contentItems/useUnenrolUserFromContent";
import UserCourseActionsMenu from "./UserCourseActionsMenu";

const UserCoursesTable = () => {
  
  const router = useRouter()
  const { id } = router.query

  const { loading, error, user } = useGetUser(id)

  // Table data is memo-ised due to this:
  // https://github.com/tannerlinsley/react-table/issues/1994
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
        accessorFn: row => row.node.title, // accessor is the key in the data
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
        id: "EnrolmentStatus",
        header: "Status",
        cell: ({ cell }) => {
          const values = cell.row.original;
          return (
            <div className="text-right">
              { !!cell.row.original.groups.edges.length && (
                <>
                  Enrolled via group:
                  <strong> {cell.row.original.groups.edges.map(edge => edge.node.name).join(', ')}
                  </strong>
                </>
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
    showTop: false
  }
    
  return (
    <Table { ...tableProps } />
  );
}

export default UserCoursesTable