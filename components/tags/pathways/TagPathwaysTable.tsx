import { useCallback, useContext, useMemo } from "react";
import useGetUser from "../../../hooks/users/useGetUser";
import Table from "../../common/tables/Table";
import { useRouter } from '../../../utils/router';
import ItemWithImage from "../../common/cells/ItemWithImage";
import TagPathwayActionsMenu from "./TagPathwayActionsMenu";
import useGetCurrentUser from "../../../hooks/users/useGetCurrentUser";

const TagPathwaysTable = ({tag}) => {
  
  const router = useRouter()
  const { id } = router.query

  const { pathways } = useGetCurrentUser()
  // Table data is memo-ised due to this:
  // https://github.com/tannerlinsley/react-table/issues/1994
  const tableData = useMemo(
    () => {
      return pathways.edges.filter(edge => (
        !edge.node._deleted
         && (
          edge.node.tags.edges.find(({node}) => node.id === id)
        )
      )) || []
    },
    [tag]
  );

  const tableCols = useMemo(() => {
    return [
      {
        header: "Pathway",
        accessorFn: row => row.node.title, // accessor is the key in the data
        cell: ({ cell }) => {
          const pathway = cell.row.original.node;
          return (
            <ItemWithImage
              title={pathway.title}
              image={pathway.image}
            />
          )
        }
      },
      {
        header: "Actions",
        accessorKey: "actions",
        cell: ({ cell }) => <TagPathwayActionsMenu tag={tag} pathway={cell.row.original} />
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

export default TagPathwaysTable