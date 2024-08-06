import { useMutation } from '@apollo/client';
import { useMemo } from 'react';
import cache from '../../../graphql/cache';
import { TagFragmentFragment } from '../../../graphql/generated';
import { REORDER_TAGS } from '../../../graphql/mutations/tag/REORDER_TAGS';
import { GET_TAGS, TagFragment } from '../../../graphql/queries/tags';
import useGetCourses from '../../../hooks/courses/useGetCourses';
import useGetPathways from '../../../hooks/pathways/useGetPathways';
import useGetResources from '../../../hooks/resources/useGetResources';
import useGetTags from '../../../hooks/tags/useGetTags';
import useReorderTags from '../../../hooks/tags/useReorderTags';
import ItemWithImage from '../../common/cells/ItemWithImage';
import LoadingSpinner from '../../common/LoadingSpinner';
import Table from '../../common/tables/Table';
import { tagTypes } from '../../common/tagTypes';
import TagActionsMenu from '../TagActionsMenu';

const getTagContentTypeCount = (cell, content) => {
  return content?.edges.filter(
    edge => edge.node.tags.edges.map(
      ({node}) => node.id
    ).includes(cell.row.original.id)
  ).length
}

const TagsTable = ({typeName='category'}) => {

  const { tags, loading, error } = useGetTags()
  const { courses, loading: loadingCourses } = useGetCourses()
  const { resources, loading: loadingResources } = useGetResources()
  const { pathways, loading: loadingPathways } = useGetPathways()
  
  const tagType = tagTypes[typeName]
  const editUrl = tagType.editUrl

  const { reorderTags } = useReorderTags()

  // Table data is memo-ised due to this:
  // https://github.com/tannerlinsley/react-table/issues/1994
  const tableData = useMemo(
    () => {
      return tags?.filter(item => !item._deleted)
      .filter(item => item.tagType === tagType.name)
      .sort((a,b) => b.order - a.order) || []
    }, [tags, courses, resources, pathways]
  );

  const tableCols = useMemo(
    () => [
      {
        header: `${tagType.label} name`,
        accessorKey: "label", // accessor is the "key" in the data
        cell: ({ cell }) => {
        
            const icon = tagType.icon ? <tagType.icon className='p-1' /> : null;
          
          return <ItemWithImage
            image={cell.row.original.image}
            icon={icon}
            title={cell.getValue()}
            secondary={cell.row.original.tags?.map(tag => tag.label).join(', ')}
            href={cell.row.original.id && `${editUrl}?id=${cell.row.original.id}`}
            // imgDivClass={'bg-main text-white'}
          />
        }
      },
      {
        id: 'order',
        header: "Order",
        accessorKey: 'order'
      },
      {
        header: "Courses",
        cell: ({ cell }) => {
          return getTagContentTypeCount(cell, courses)
        }
      },
      {
        header: "Resources",
        cell: ({ cell }) => {
          return getTagContentTypeCount(cell, resources)
        }
      },
      {
        header: "Pathways",
        cell: ({ cell }) => {
          return getTagContentTypeCount(cell, pathways)
        }
      },
      {
        width: 300,
        header: "Actions",
        accessorKey: "actions",
        cell: ({ cell }) => <TagActionsMenu tag={cell.row.original} />
      }
    ],
    // [courses]
    [courses, resources, pathways]
  );

  const tableProps = {
    tableData,
    tableCols,
    typeName,
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

      reorderTags(active.id, newOrder)
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