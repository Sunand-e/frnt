import React, { useEffect, useMemo, useState } from 'react';
import Table from '../../common/tables/Table'
import ItemWithImage from '../../common/cells/ItemWithImage';
import {Category} from '@styled-icons/material-rounded/Category'
import LoadingSpinner from '../../common/LoadingSpinner';
import useGetCurrentUser from '../../../hooks/users/useGetCurrentUser';
import TagActionsMenu from '../TagActionsMenu';
import { useMutation } from '@apollo/client';
import { GET_TAGS, TagFragment } from '../../../graphql/queries/tags';
import { arrayMove } from '@dnd-kit/sortable';
import cache from '../../../graphql/cache';
import { TagFragmentFragment } from '../../../graphql/generated';
import { REORDER_TAGS } from '../../../graphql/mutations/tag/REORDER_TAGS';
import { GET_CURRENT_USER } from '../../../graphql/queries/users';
import useGetTags from '../../../hooks/tags/useGetTags';
import useGetResources from '../../../hooks/resources/useGetResources';
import useGetCourses from '../../../hooks/courses/useGetCourses';
import useGetPathways from '../../../hooks/pathways/useGetPathways';

const TagsTable = () => {

  const { tags, loading, error } = useGetTags()
  const { courses, loading: loadingCourses } = useGetCourses()
  const { resources, loading: loadingResources } = useGetResources()
  const { pathways, loading: loadingPathways } = useGetPathways()
  
  const editUrl = '/admin/tags/edit'

  const [reorderTagsMutation, reorderTagsMutationResponse] = useMutation(
    REORDER_TAGS
  ) 


  // Table data is memo-ised due to this:
  // https://github.com/tannerlinsley/react-table/issues/1994
  const tableData = useMemo(
    () => {
      return tags?.filter(item => !item._deleted).sort((a,b) => b.order - a.order) || []
    }, [tags, courses, resources, pathways]
  );
  
  const tableCols = useMemo(
    () => [
      {
        header: "Category Name",
        accessorKey: "label", // accessor is the "key" in the data
        cell: ({ cell }) => (
          <ItemWithImage
            image={cell.row.original.image}
            icon={<Category className='p-2' />}
            title={cell.getValue()}
            secondary={cell.row.original.tags?.map(tag => tag.label).join(', ')}
            href={cell.row.original.id && `${editUrl}?id=${cell.row.original.id}`}
            imgDivClass={'bg-main text-white'}
          />
        )
      },
      {
        id: 'order',
        header: "Order",
        accessorKey: 'order'
      },
      {
        header: "Item count",
        cell: ({ cell }) => {
          const allItemEdges = [
            ...(courses?.edges || []),
          ]
          const catItemCount = allItemEdges.filter(
            edge => edge.node.tags.edges.map(
              ({node}) => node.id
            ).includes(cell.row.original.id)
          ).length
          return (
            <span>{`${catItemCount || 0} item${catItemCount !== 1 ? 's' : ''}`}</span>
          )
        }
      },
      {
        width: 300,
        header: "Actions",
        accessorKey: "actions",
        cell: ({ cell }) => <TagActionsMenu tag={cell.row.original} />
      }
    ],
    [courses]
    // [courses, resources, pathways]
  );

  const tableProps = {
    tableData,
    tableCols,
    typeName: 'category',
    isReorderable: true,
    onReorder: (active, over, newIndex, oldIndex) => {

      const overTag = cache.readFragment<TagFragmentFragment>({
        id:`Tag:${over.id}`,
        fragment: TagFragment
      },true)

      const activeTag = cache.readFragment<TagFragmentFragment>({
        id:`Tag:${active.id}`,
        fragment: TagFragment
      },true)

      const newOrder = overTag.order + Number(overTag.order > activeTag.order)
      reorderTagsMutation({
        variables: {
          id: active.id,
          order: newOrder
        },
        update(cache, response) {
          const newData = {
            tags: tags.map(tag => {
              if(tag.id === activeTag.id) {
                return {
                  ...tag,
                  order: newOrder
                }
              } else if(tag.order >= newOrder) {
                const newTag = {
                  ...tag,
                  order: tag.order + 1
                }
                return newTag 
              } else {
                return tag
              }
            })
          }
          cache.updateQuery({ query: GET_CURRENT_USER, optimistic: true}, (data) => ({
            ...data,
            ...newData
          }))
        },
        optimisticResponse: {
          reorderTags: {
            __typename: "ReorderTagsPayload",
            tag: {
              ...activeTag,
              order: newOrder
            }
          }
        }
      })

    }
  }
    

  return (
    <>
      { loading && (
        <LoadingSpinner />
      )}
      { error && (
        <p>Unable to fetch tags.</p>
      )}
      { (!loading && !error) && (
        <Table { ...tableProps } />
      )}
    </>
  );
}

export default TagsTable