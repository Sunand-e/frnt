import { useMemo } from "react";
import useGetGroup from "../../../hooks/groups/useGetGroup";
import useGetUser from "../../../hooks/users/useGetUser";
import { useRouter } from '../../../utils/router';
import ItemWithImage from "../../common/cells/ItemWithImage";
import Table from "../../common/tables/Table";
import OrganisationCourseActionsMenu from "./OrganisationCourseActionsMenu";

const OrganisationCoursesTable = () => {
  
  const router = useRouter()
  const { id } = router.query

  const { loading, error, group } = useGetGroup(id)
  
  const tableData = useMemo(
    () => {
      return group?.availableCourses.edges.filter(edge => (
        !edge.node._deleted
      )) || []
    },
    [group]
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
      {
        header: "Actions",
        accessorKey: "actions",
        cell: ({ cell }) => <OrganisationCourseActionsMenu group={group} edge={cell.row.original} />
      },
    ]
  }, [group]);

  const tableProps = {
    tableData,
    tableCols,
    showTop: false
  }
    
  return (
    <Table { ...tableProps } />
  );
}

export default OrganisationCoursesTable