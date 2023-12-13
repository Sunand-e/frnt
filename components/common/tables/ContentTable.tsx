import React, { useMemo, useState } from 'react';
import Table from '../../common/tables/Table'
import ItemWithImage from '../../common/cells/ItemWithImage';
import LoadingSpinner from '../../common/LoadingSpinner';
import { TableProps } from '../../common/tables/tableContext';
import { GetCurrentUserQuery } from '../../../graphql/generated';
import { ContentFragment } from '../../../graphql/queries/allQueries';
import cache from '../../../graphql/cache';
import { gql, useMutation } from '@apollo/client';
import { REORDER_CONTENT } from '../../../graphql/mutations/contentItem/REORDER_CONTENT';
import { GET_CURRENT_USER } from '../../../graphql/queries/users';
import { getIconFromFilename } from '../../../utils/getIconFromFilename';
import useGetThumbnail from '../items/useGetThumbnail';
import { resourceTypes } from '../../resources/resourceTypes';
import startCase from 'lodash/startCase';
import Editor from '../inputs/Editor';
import { extractTextNodesFromTipTapDoc } from '../../../utils/extractTextNodesFromTipTapDoc';

const ContentIdAndOrderFragment = gql`
  fragment ContentIdAndOrderFragment on ContentItem {
    id
    order
    _deleted @client
  }
`
const ContentTable = ({content, type, loading, error, ActionsMenuComponent, tableProps={}, idKey='id'}) => {

  const [reorderContentItemsMutation, reorderContentItemsMutationResponse] = useMutation(
    REORDER_CONTENT
  ) 

  // Table data is memo-ised due to this:
  // https://github.com/tannerlinsley/react-table/issues/1994
  const tableData = useMemo(
    () => {
      return content?.edges?.map(edge => edge.node).filter(node  => {
        return !node._deleted
      }).sort((a,b) => b.order - a.order) || []
    }, [content]
  );

  const tableCols = useMemo(
    () => [
      {
        header: type.label,
        accessorKey: "title", // accessor is the "key" in the data
        cell: ({ cell }) => {
          
          const { src } = useGetThumbnail(cell.row.original, 50)
          const { contentType, itemType } = cell.row.original
          let icon = <type.icon className='p-1'/>
          let rounded = 'full'
          let secondary = cell.row.original?.tags?.edges.map?.(({node}) => node.label).join(', ')
           
          if(itemType==='resource') {
            const IconComponent = (contentType === 'document') ? (
              getIconFromFilename(cell.row.original.document?.fileName)
            ) : (
              resourceTypes[contentType]?.icon
            )
            icon = <IconComponent />
            rounded = (!src && contentType === 'document') ? 'none' : 'full'
            secondary = startCase(cell.row.original.contentType)
          }
          const cellProps = {
            image: cell.row.original.image,
            imageSrc: src,
            icon,
            rounded,
            title: cell.getValue(),
            href: cell.row.original.shared === false && 
              `/${type.editUrl}?${idKey}=${cell.row.original.id}`
          }


          return (
          <ItemWithImage { ...cellProps } />
          )
        }
      },
      {
        id: 'order',
        header: "Order",
        accessorKey: 'order'
      },
      ...(type.name === 'resource' ? [{
          header: "Description",
          width: '100',
          cell: ({ cell }) => (
            <span className='line-clamp-2'>
              { extractTextNodesFromTipTapDoc(cell.row.original.content?.description) }
            </span>
          )
        }] : []
      ),
      {
        id: 'activeUsers',
        header: "Active users",
        accessorFn: row => row.users?.totalCount,
        cell: ({ cell }) => {
          let userCount = cell.row.original.users?.totalCount
          return (
            <span>{`${userCount || 0} user${userCount !== 1 ? 's' : ''}`}</span>
          )
        }
      },
      {
        id: 'category',
        header: "Category",
        accessorFn: (row) => {
          return row.tags?.edges.filter(({node}) => (
            node.tagType === 'category'
          )).map(({node}) => node.label).join(', ') || '-'
        },
        cell: ({ cell }) => (
          <span className='line-clamp-2'>
            { cell.renderValue() }
          </span>
        )
      },
      {
        width: 300,
        header: "Actions",
        accessorKey: "actions",
        cell: ({ cell }) => <ActionsMenuComponent content={cell.row.original} />
      }
    ],
    []
  );
    
  const handleReorder = (active, over, newIndex, oldIndex) => {

    const overItem = cache.readFragment({
      id:`ContentItem:${over.id}`,
      fragment: ContentIdAndOrderFragment,
    },true)

    const activeItem = cache.readFragment({
      id:`ContentItem:${active.id}`,
      fragment: ContentFragment,
      fragmentName: 'ContentFragment',
    },true)

    const newOrder = overItem.order + Number(overItem.order > activeItem.order)

    reorderContentItemsMutation({
      variables: {
        id: activeItem.id,
        order: newOrder
      },
      
      update(cache, response, request) {
        
        const cachedData = cache.readQuery<GetCurrentUserQuery>({
          query: GET_CURRENT_USER
        },true)
        if(cachedData) {
          const newData = {
            [type.pluralKey]: {
              ...cachedData[type.pluralKey],
              edges: cachedData[type.pluralKey].edges.map(edge => {
                if(
                  edge.node.id !== activeItem.id
                  && edge.node.order >= newOrder
                ) {
                  const newEdge = {
                    ...edge,
                    node: {
                      ...edge.node,
                      order: edge.node.order + 1
                    }    
                  }
                  return newEdge 
                } else {
                  return edge
                }
              })
            }
          }
          
          cache.updateQuery({ query: GET_CURRENT_USER}, (data) => ({
            ...data,
            ...newData
          }))
        }
      },
      optimisticResponse: {
        reorderContentItems: {
          tenantContentItem: {
            contentItem: {
              id: activeItem.id,
              order: newOrder,
              __typename: "ContentItem"
            },
            __typename: "TenantContentItem"
          },
          __typename: "ReorderContentItemsPayload"
        }
      },
    })
  }

  const tProps: TableProps = {
    tableData,
    tableCols,
    typeName: type.name,
    isReorderable: true,
    typeOptions: tableProps.typeOptions || {},
    onReorder: handleReorder,
    filters: tableProps.filters ?? ['category', 'global'],
    // onFilterChange: handleFilterChange
  }

  return (
    <>
      { loading && (
        <LoadingSpinner />
      )}
      { error && (
        <p>Unable to fetch {type.plural}.</p>
      )}
      { (!loading && !error) && (
        <Table {...tProps} />
      )}
    </>
  );
}

// ContentTable.whyDidYouRender = true
export default ContentTable
