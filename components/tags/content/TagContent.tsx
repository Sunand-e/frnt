import { GraduationCap } from "@styled-icons/fa-solid/GraduationCap";
import { useCallback, useEffect, useMemo, useState } from "react";
import cache from "../../../graphql/cache";
import { ContentItemTagEdgeFragmentFragment } from "../../../graphql/generated";
import { ContentItemTagEdgeFragment } from "../../../graphql/queries/allQueries";
import useRemoveTagsFromContent from "../../../hooks/contentItems/useRemoveTagsFromContent";
import useReorderTagContent from "../../../hooks/tags/useReorderTagContent";
import { handleModal, useModalStore } from "../../../stores/modalStore";
import { commonTableCols } from "../../../utils/commonTableCols";
import { getContentTypeStringWithCount } from "../../../utils/getContentTypeStringWithCount";
import ContentTitleCell from "../../common/cells/ContentTitleCell";
import BoxContainerTable from "../../common/tables/BoxContainerTable";
import { tagTypes } from "../../common/tagTypes";
import AddTagToContent from "../content/AddTagToContent";
import TagContentActionsMenu from "./TagContentActionsMenu";

const TagContent = ({tag, contentType, content, isLoading}) => {
  
  const tagType = tagTypes[tag.tagType]

  const modalContent = <AddTagToContent tag={tag} content={content} isLoading={isLoading} typeName={contentType.name} />

  useEffect(() => {
    useModalStore.setState({modalContent})
  }, [isLoading]);

  const button = {
    text: `Add ${contentType.name} ${isLoading ? 'loooading' : ''}`,
    onClick: () => {
      handleModal({
        title: `Add ${contentType.plural} to ${tagType.name}: ${tag.label}`,
        content: modalContent,
        size: 'lg'
      })
    }
  }
  
  const {removeTagsFromContent} = useRemoveTagsFromContent()
  
  const handleRemove = useCallback(ids => {
    removeTagsFromContent({
      tagIds: [tag.id],
      contentItemIds: ids,
    })
  }, [tag])
  
  const getContentTagEdge = (contentEdge) => {
    return contentEdge.node.tags.edges.find(({node}) => node.id === tag.id)
  }
  
  const bulkActions = [
    {
      label: `Remove selected items from ${tagType.name}`,
      labelFn: (ids: Array<string>) => `Remove ${getContentTypeStringWithCount(contentType, ids.length, 'selected')}`,
      onClick: (ids: Array<string>) => handleRemove(ids),
    }
  ]

  const tableData = useMemo(() => {
    return (
      content?.edges
        .filter(edge => !edge.node._deleted && getContentTagEdge(edge))
        .sort((a, b) => getContentTagEdge(b).order - getContentTagEdge(a).order) || []
    );
  }, [tag, content]);


  const { reorderTagContent } = useReorderTagContent() 
  
  const tableCols = useMemo(() => {
    return [
      {
        header: contentType.label,
        accessorFn: row => row.node.title, // accessor is the key in the data
        cell: ({ cell }) => <ContentTitleCell item={cell.row.original.node} />,
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
        ...commonTableCols.actions,
        cell: ({ cell }) => <TagContentActionsMenu tag={tag} contentType={contentType} item={cell.row.original} onRemove={handleRemove} />
      },
    ]
  }, []);

  const tableProps = {
    tableData,
    tableCols,
    isReorderable: true,
    bulkActions,
    isLoading,
    loadingText: `Loading ${tag.tagType} ${contentType.plural}`,
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
      
      reorderTagContent(tag.id, activeEdge.contentItemId, newOrder, tableData)
    }
  }

  return (
    <BoxContainerTable
      title={`${contentType.label}s`}
      icon={GraduationCap}
      button={button}
      tableProps={tableProps}
    />
  )
}

export default TagContent