import { useMemo } from "react";
import cache from "../../../graphql/cache";
import { ContentItemTagEdgeFragmentFragment } from "../../../graphql/generated";
import { ContentItemTagEdgeFragment } from "../../../graphql/queries/allQueries";
import useReorderTagContent from "../../../hooks/tags/useReorderTagContent";
import ItemWithImage from "../../common/cells/ItemWithImage";
import Table from "../../common/tables/Table";
import TagContentActionsMenu from "./TagContentActionsMenu";

const TagContentTable = ({tag, contentType, data}) => {

  const { reorderTagContent } = useReorderTagContent() 
  
  const tableCols = useMemo(() => {
    return [
      {
        header: contentType.label,
        accessorFn: row => row.node.title, // accessor is the key in the data
        cell: ({ cell }) => {
          const content = cell.row.original.node;
          return (
            <ItemWithImage
              title={content.title}
              image={content.image}
            />
          )
        }
      },
      {
        header: 'order',
        accessorFn: row => {
          return row.node.tags.edges.find(
            ({node}) => node.id === tag.id
          ).order
        },
        id: 'order',
      },
      {
        header: "Actions",
        accessorKey: "actions",
        cell: ({ cell }) => <TagContentActionsMenu tag={tag} contentType={contentType} item={cell.row.original} />
      },
    ]
  }, []);

  const tableProps = {
    tableData: data,
    tableCols,
    showTop: false,
    isReorderable: true,
    getReorderableItemIdFromRow: row => {
      return `${row.original.node.id}:${tag.id}`
    },
    onReorder: (active, over, newIndex, oldIndex) => {

      const overEdge = cache.readFragment<ContentItemTagEdgeFragmentFragment>({
        id:`ContentItemTagEdge:${over.id}`,
        fragment: ContentItemTagEdgeFragment
      },true)
      
      const activeEdge = cache.readFragment<ContentItemTagEdgeFragmentFragment>({
        id:`ContentItemTagEdge:${active.id}`,
        fragment: ContentItemTagEdgeFragment
      },true)
      
      const newOrder = overEdge.order + Number(overEdge.order > activeEdge.order)
      
      reorderTagContent(tag.id, activeEdge.contentItemId, newOrder, data)
    }
  }
    
  return (
    <Table { ...tableProps } />
  );
}

export default TagContentTable