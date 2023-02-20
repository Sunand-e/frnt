import { useMemo } from "react";
import Table from "../../common/tables/Table";
import ItemWithImage from "../../common/cells/ItemWithImage";
import TagContentActionsMenu from "./TagContentActionsMenu";
import { ContentItemTagEdgeFragmentFragment } from "../../../graphql/generated";
import { ContentItemTagEdgeFragment } from "../../../graphql/queries/allQueries";
import cache from "../../../graphql/cache";
import { REORDER_TAG_CONTENT } from "../../../graphql/mutations/tag/REORDER_TAG_CONTENT";
import { useMutation } from "@apollo/client";

const TagContentTable = ({tag, contentType, content}) => {

  const [reorderTagContentMutation, reorderTagContentMutationResponse] = useMutation(
    REORDER_TAG_CONTENT
  ) 
  
  const getContentTagEdge = (contentEdge) => {
    return contentEdge.node.tags.edges.find(({node}) => node.id === tag.id)
  }
  // Table data is memo-ised due to this:
  // https://github.com/tannerlinsley/react-table/issues/1994
  const tableData = useMemo(
    () => {
      return content.edges.filter(edge => {
        return (
        !edge.node._deleted
         && getContentTagEdge(edge)
        )
      }).sort((a,b) => getContentTagEdge(b).order - getContentTagEdge(a).order) || []
    },
    [tag,content]
  );
  
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
      // {
      //   header: 'order',
      //   accessorFn: row => {
      //     return row.node.tags.edges.find(
      //       ({node}) => node.id === tag.id
      //     ).order
      //   },
      //   id: 'order',
      // },
      {
        header: "Actions",
        accessorKey: "actions",
        cell: ({ cell }) => <TagContentActionsMenu tag={tag} contentType={contentType} item={cell.row.original} />
      },
    ]
  }, []);

  const tableProps = {
    tableData,
    tableCols,
    showTop: false,
    isReorderable: true,
    getReorderableItemIdFromRow: row => getContentTagEdge(row.original).id,
    onReorder: (active, over, newIndex, oldIndex) => {

      const contentItemId = tableData.find(
        userContentEdge => userContentEdge.node.tags.edges.some(edge => edge.id === active.id)
      ).node.id

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
          contentItemId,
          order: newOrder,
        },

        update(cache, response) {
          for (let contentEdge of tableData) {
            const contentTagEdge = getContentTagEdge(contentEdge)
            let order: number
            if(contentTagEdge.id === activeEdge.id) {
              order = newOrder
            } else if(contentTagEdge.order >= newOrder) {
              order = contentTagEdge.order + 1
            } else {
              continue
            }
            cache.updateFragment({ 
              id:`ContentItemTagEdge:${contentTagEdge.id}`,
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