import { useMemo } from "react";
import useGetGroup from "../../hooks/groups/useGetGroup";
import { commonTableCols } from "../../utils/commonTableCols";
import { useRouter } from '../../utils/router';
import ItemWithImage from "../common/cells/ItemWithImage";
import Table from "../common/tables/Table";
import GroupContentActionsMenu from "./GroupContentActionsMenu";

const GroupContentTable = ({typeName='content', associationType='assigned'}) => {
  
  const router = useRouter()
  const { id } = router.query

  const { loading, error, group } = useGetGroup(id)
  
  const tableData = useMemo(
    () => {
      let existingAssociatedContentConnection
      if(associationType === 'assigned') {
        existingAssociatedContentConnection = group.assignedContents
      } else if(associationType === 'provided') {
        existingAssociatedContentConnection = group.provisionedContents
      }
      // console.log('existingAssociatedContentConnection')
      // console.log(existingAssociatedContentConnection)
      return existingAssociatedContentConnection.edges.filter(edge => (
        (typeName === 'content' || edge.node.itemType === typeName) &&
        !edge.node._deleted
        )).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) || []
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
      commonTableCols.createdAt,
      {
        header: "Actions",
        accessorKey: "actions",
        cell: ({ cell }) => (
          <GroupContentActionsMenu
            group={group}
            associationType={associationType}
            edge={cell.row.original}
            typeName={typeName}
          />
        )
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

export default GroupContentTable