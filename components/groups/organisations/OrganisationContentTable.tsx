import { useMemo } from "react";
import useGetGroup from "../../../hooks/groups/useGetGroup";
import { useRouter } from '../../../utils/router';
import ItemWithImage from "../../common/cells/ItemWithImage";
import Table from "../../common/tables/Table";
import OrganisationContentActionsMenu from "./OrganisationContentActionsMenu";

const OrganisationContentTable = ({typeName='content'}) => {
  
  const router = useRouter()
  const { id } = router.query

  const { loading, error, group } = useGetGroup(id)
  
  const tableData = useMemo(
    () => {
      return group?.provisionedContents.edges.filter(edge => (
        (typeName === 'content' || edge.node.itemType === typeName) &&
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
              // image={course.image}
            />
          )
        }
      },
      {
        header: "Actions",
        accessorKey: "actions",
        cell: ({ cell }) => <OrganisationContentActionsMenu group={group} edge={cell.row.original} typeName={typeName} />
      },
    ]
  }, [group]);

  const tableProps = {
    tableData,
    tableCols,
    scrollInTable: true,
    maxVisibleRows: 5,
    showTop: false
  }
    
  return (
    <Table { ...tableProps } />
  );
}

export default OrganisationContentTable