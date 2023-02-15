import React, { useContext, useEffect, useMemo, useState } from 'react';
import Table from '../../common/tables/Table'
import useGetCourses from '../../../hooks/courses/useGetCourses';
import ItemWithImage from '../../common/cells/ItemWithImage';
import TagSelect from '../../tags/inputs/TagSelect';
import useGetCoursesBasic from '../../../hooks/courses/useGetCoursesBasic';
import LoadingSpinner from '../../common/LoadingSpinner';
import { GraduationCap } from 'styled-icons/fa-solid';
import CourseActionsMenu from './CourseActionsMenu';
import { TableProps } from '../../common/tables/tableContext';
import { CourseFragmentFragment, GetCoursesQuery, GetCurrentUserQuery } from '../../../graphql/generated';
import { CourseFragment, GET_COURSES } from '../../../graphql/queries/allQueries';
import cache from '../../../graphql/cache';
import { gql, useMutation } from '@apollo/client';
import { REORDER_CONTENT } from '../../../graphql/mutations/contentItem/REORDER_CONTENT';
import { arrayMove } from '@dnd-kit/sortable';
import { GET_CURRENT_USER } from '../../../graphql/queries/users';

const CourseIdAndOrderFragment = gql`
  fragment CourseIdAndOrderFragment on ContentItem {
    id
    order
    _deleted @client
  }
`
const CoursesTable = ({selectable=false, onSelectionChange=null}) => {


  const { loading, error, courses } = useGetCourses()
  const [isReorderable, setIsReorderable] = useState(false)
  const [onReorder, setOnReorder] = useState(null)

  const [reorderContentItemsMutation, reorderContentItemsMutationResponse] = useMutation(
    REORDER_CONTENT
  ) 

  const editUrl = '/admin/courses/edit'

  // Table data is memo-ised due to this:
  // https://github.com/tannerlinsley/react-table/issues/1994
  const tableData = useMemo(
    () => {
      return courses?.edges?.map(edge => edge.node).filter(node  => {
        return !node._deleted
      }).sort((a,b) => b.order - a.order) || []
    }, [courses]
  );

  const tableCols = useMemo(
    () => [
      {
        header: "Course",
        accessorKey: "title", // accessor is the "key" in the data
        cell: ({ cell }) => (
          <ItemWithImage
            image={cell.row.original.image}
            icon={<GraduationCap className='p-1'/>}
            title={cell.getValue()}
            secondary={cell.row.original?.tags?.edges.map?.(({node}) => node.label).join(', ')}
            // secondary={cell.row.original.title}
            href={
              cell.row.original.shared === false && 
                cell.row.original.id &&
                  `${editUrl}?id=${cell.row.original.id}`
            }
          />
        )
      },
      {
        id: 'order',
        header: "Order",
        accessorKey: 'order'
      },
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
          )).map(node => node.label).join(', ') || '-'
        },
      },
      {
        width: 300,
        header: "Actions",
        accessorKey: "actions",
        cell: ({ cell }) => <CourseActionsMenu course={cell.row.original} />
      }
    ],
    []
  );
    
  const handleReorder = (active, over, newIndex, oldIndex) => {

    const overItem = cache.readFragment({
      id:`ContentItem:${over.id}`,
      fragment: CourseIdAndOrderFragment,
    },true)

    const activeItem = cache.readFragment({
      id:`ContentItem:${active.id}`,
      fragment: CourseFragment,
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
        
        const newData = {
          courses: {
            ...cachedData.courses,
            edges: cachedData.courses.edges.map(edge => {
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

  const handleFilterChange = (categoryId, globalFilter) => {
    if(globalFilter || categoryId) {
      setIsReorderable(false)
    } else {
      setIsReorderable(true)
      setOnReorder(() => handleReorder)
      // if(categoryId) {
      //   setOnReorder(() => handleReorderInTags)
      // } else {
      //   setOnReorder(() => handleReorder)
      // }
    }
  }

  const tableProps: TableProps = {
    tableData,
    tableCols,
    typeName: 'course',
    isReorderable,
    onReorder,
    filters: ['category', 'global'],
    onFilterChange: handleFilterChange
  }

  return (
    <>
      { loading && (
        <LoadingSpinner />
      )}
      { error && (
        <p>Unable to fetch courses.</p>
      )}
      { (!loading && !error) && (
        <Table {...tableProps} />
      )}
    </>
  );
}

export default CoursesTable
