import { useMemo } from "react";
import Table from "../../common/tables/Table";
import ItemWithImage from "../../common/cells/ItemWithImage";
import TagResourceActionsMenu from "./TagResourceActionsMenu";
import useGetCurrentUser from "../../../hooks/users/useGetCurrentUser";

const TagResourcesTable = ({tag}) => {

  const { resources } = useGetCurrentUser()
  // Table data is memo-ised due to this:
  // https://github.com/tannerlinsley/react-table/issues/1994
  const tableData = useMemo(
    () => {
      return resources.edges.filter(edge => (
        !edge.node._deleted
         && (
          edge.node.tags.edges.find(({node}) => node.id === tag.id)
        )
      )) || []
    },
    [tag]
  );

  const tableCols = useMemo(() => {
    return [
      {
        header: "Resource",
        accessorFn: row => row.node.title, // accessor is the key in the data
        cell: ({ cell }) => {
          const resource = cell.row.original.node;
          return (
            <ItemWithImage
              title={resource.title}
              image={resource.image}
            />
          )
        }
      },
      {
        header: "Actions",
        accessorKey: "actions",
        cell: ({ cell }) => <TagResourceActionsMenu tag={tag} resource={cell.row.original} />
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

export default TagResourcesTable