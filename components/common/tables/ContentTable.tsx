import { gql, useMutation } from '@apollo/client';
import startCase from 'lodash/startCase';
import { useMemo } from 'react';
import cache from '../../../graphql/cache';
import { GetCurrentUserQuery } from '../../../graphql/generated';
import { REORDER_CONTENT } from '../../../graphql/mutations/contentItem/REORDER_CONTENT';
import useUserHasCapability from '../../../hooks/users/useUserHasCapability';
import { commonTableCols } from '../../../utils/commonTableCols';
import { extractTextNodesFromTipTapDoc } from '../../../utils/extractTextNodesFromTipTapDoc';
import Table from '../../common/tables/Table';
import { TableProps } from '../../common/tables/tableContext';
import ContentTitleCell from '../cells/ContentTitleCell';
import { getContentEditUrl } from '../contentTypes';

const ContentIdAndOrderFragment = gql`
  fragment ContentIdAndOrderFragment on ContentItem {
    id
    order
    _deleted @client
  }
`
interface ContentTableProps<T> {
  content: any;
  type: any;
  loading: boolean;
  loadingMore?: boolean;
  error?: any;
  ActionsMenuComponent?: any;
  tableProps?: any;
  remote?: boolean;
  reLoad?: any; // Add reLoad
}


const ContentTable = <T,>({
  content,
  type,
  loading,
  loadingMore = false,
  error,
  ActionsMenuComponent,
  tableProps = {},
  remote = false,
  reLoad,
}: ContentTableProps<T>) => {

  const [reorderContentItemsMutation, reorderContentItemsMutationResponse] = useMutation(
    REORDER_CONTENT
  )

  const { userHasCapability } = useUserHasCapability()

  const tableData = useMemo(
    () => {
      const filter_content = content?.edges?.map((edge: any) => edge.node).filter((node: any)  => {
        return !node._deleted
      }) || []
      if (remote) {
        return filter_content
      } 
      else {
        return filter_content.sort((a: any, b: any) => b.order - a.order)
      }
    }, [content]
  );

  const count = content?.totalCount || 0

  const tableCols = useMemo(
    () => [
      {
        header: type.label,
        accessorKey: "title", // accessor is the "key" in the data
        sortField: 'title',
        cell: ({ cell }) => {
          const { itemType } = cell.row.original
          let secondary = cell.row.original?.tags?.edges.map?.(({node}) => node.label).join(', ')
           
          if(itemType==='resource') {
            secondary = startCase(cell.row.original.contentType)
          }
          const href = cell.row.original.shared === false && getContentEditUrl(cell.row.original)
          
          const props = { secondary, href }

          return <ContentTitleCell item={cell.row.original} itemWithImageProps={props} />
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
          accessorFn: (row: any) => row.content?.description,
          cell: ({ cell }) => (
            <span className='line-clamp-2'>
              { extractTextNodesFromTipTapDoc(cell.row.original.content?.description) || '-' }
            </span>
          )
        }] : []
      ),
      {
        id: 'activeUsers',
        header: "Active users",
        accessorFn: (row: any) => row.users?.totalCount,
        enableSorting: !remote,
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
        enableSorting: !remote,
        accessorFn: (row: any) => {
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
      ...(type.name === 'course' && userHasCapability(`ViewCreditsUsed`) ? [{
        id: 'creditsUsed',
        header: 'Credits Used',
        accessorKey: 'creditsUsed',
        sortField: 'credits_used',
        accessorFn: (row: any) => row?.creditsUsed,
      }] : []),
      {
        ...commonTableCols.actions,
        cell: ({ cell }) => <ActionsMenuComponent content={cell.row.original} />,
        width: 300,
      },
    ],
    [userHasCapability]
  );

  const handleReorder = (active, over, newIndex, oldIndex) => {

    const overItem = cache.readFragment({
      id:`ContentItem:${over.id}`,
      fragment: ContentIdAndOrderFragment,
    },true)

    const activeItem = cache.readFragment({
      id:`ContentItem:${active.id}`,
      fragment: ContentIdAndOrderFragment,
    },true)

    const newOrder = overItem.order + Number(overItem.order > activeItem.order)

    reorderContentItemsMutation({
      variables: {
        id: activeItem.id,
        order: newOrder
      },
      
      update(cache, response, request) {
        
        const cachedData = cache.readQuery<GetCurrentUserQuery>({
          query: type.gqlGetQuery
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
          
          cache.updateQuery({ query: type.gqlGetQuery }, (data) => ({
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
  
  const capitalisedPluralKey = type.pluralKey.charAt(0).toUpperCase() + type.pluralKey.slice(1);

  const tProps: TableProps = {
    count,
    tableData,
    tableCols,
    typeName: type.name,
    isReorderable: userHasCapability(`Reorder${capitalisedPluralKey}`),
    isLoading: loading,
    loadingText: "Loading " + type.plural,
    typeOptions: tableProps.typeOptions || {},
    onReorder: handleReorder,
    filters: tableProps.filters ?? ['category', 'global'],
    remote: remote,
    reLoad: reLoad,
    isLoadingMore: loadingMore,
  }

  if(error) {
    return <p>Unable to fetch {type.plural}.</p>
  }

  return <Table {...tProps} />
}

// ContentTable.whyDidYouRender = true
export default ContentTable;
