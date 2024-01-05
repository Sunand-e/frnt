import { useMemo } from "react";
import Table from "../../common/tables/Table";
import ItemWithImage from "../../common/cells/ItemWithImage";
import TagContentActionsMenu from "./TagContentActionsMenu";
import { ContentItemTagEdgeFragmentFragment } from "../../../graphql/generated";
import { ContentItemTagEdgeFragment } from "../../../graphql/queries/allQueries";
import cache from "../../../graphql/cache";
import { REORDER_TAG_CONTENT } from "../../../graphql/mutations/tag/REORDER_TAG_CONTENT";
import { useMutation } from "@apollo/client";

const TagContentTable = ({tag, contentType, data}) => {

  const [reorderTagContentMutation, reorderTagContentMutationResponse] = useMutation(
    REORDER_TAG_CONTENT
  ) 
  
  const getContentTagEdge = (contentEdge) => {
    return contentEdge.node.tags.edges.find(({node}) => node.id === tag.id)
  }
  
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
      
      reorderTagContentMutation({
        variables: {
          tagId: tag.id,
          contentItemId: active.id.split(":")[0],
          order: newOrder,
        },

        update(cache, response) {
          for (let contentEdge of data) {
            const contentTagEdge = getContentTagEdge(contentEdge)
            let order: number
            if(contentTagEdge.contentItemId === activeEdge.contentItemId) {
              order = newOrder
            } else if(contentTagEdge.order >= newOrder) {
              order = contentTagEdge.order + 1
            } else {
              continue
            }
            cache.updateFragment({ 
              id:`ContentItemTagEdge:${contentTagEdge.contentItemId}:${tag.id}`,
              fragment: ContentItemTagEdgeFragment,
              optimistic: true
            }, (data) => {
              const newData = {
                ...data,
                order
              }
              return newData
            })
          }
        },
        optimisticResponse: {
          reorderContentItemsWithinTags: {
            __typename: "ReorderContentWithinTagsPayload",
            tagAttachment: {
              id: tag.id+'-'+activeEdge.id,
              order: newOrder,
              tag: {
                id: tag.id
              }
            }
          }
        }
      })

    }
  }
    
  return (
    <Table { ...tableProps } />
  );
}

export default TagContentTable