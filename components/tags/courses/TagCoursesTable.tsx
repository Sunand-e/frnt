import { useMemo } from "react";
import Table from "../../common/tables/Table";
import { useRouter } from '../../../utils/router';
import ItemWithImage from "../../common/cells/ItemWithImage";
import TagCourseActionsMenu from "./TagCourseActionsMenu";
import useGetCurrentUser from "../../../hooks/users/useGetCurrentUser";

const TagCoursesTable = ({tag}) => {
  
  const { courses } = useGetCurrentUser()
  // Table data is memo-ised due to this:
  // https://github.com/tannerlinsley/react-table/issues/1994
  const tableData = useMemo(
    () => {

      return courses.edges.filter(edge => {
        return (
        !edge.node._deleted
         && (
          edge.node.tags.edges.find({node} => node.id === tag.id)
        )
      )}) || []
    },
    [tag]
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
        header: "Actions",
        accessorKey: "actions",
        cell: ({ cell }) => <TagCourseActionsMenu tag={tag} course={cell.row.original} />
      },
    ]
  }, []);

  const tableProps = {
    tableData,
    tableCols,
    showTop: false,
    isReorderable: true
  }
    
  return (
    <Table { ...tableProps } />
  );
}

export default TagCoursesTable