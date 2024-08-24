import { useMemo } from 'react';
import cache from '../../../graphql/cache';
import { TagFragmentFragment } from '../../../graphql/generated';
import { TagFragment } from '../../../graphql/queries/tags';
import useGetCourses from '../../../hooks/courses/useGetCourses';
import useGetPathways from '../../../hooks/pathways/useGetPathways';
import useGetResources from '../../../hooks/resources/useGetResources';
import useGetTags from '../../../hooks/tags/useGetTags';
import useReorderTags from '../../../hooks/tags/useReorderTags';
import { commonTableCols } from '../../../utils/commonTableCols';
import ItemWithImage from '../../common/cells/ItemWithImage';
import Table from '../../common/tables/Table';
import { tagTypes } from '../../common/tagTypes';
import TagActionsMenu from '../TagActionsMenu';

const getTagContentTypeCount = (originalRow, content) => {
  return content?.edges.filter(
    edge => edge.node.tags.edges.map(
      ({node}) => node.id
    ).includes(originalRow.id)
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
            imgDivClass={!!cell.row.original.image ? 'bg-main/25' : ''}
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
        accessorFn: (row, index) => {
          return getTagContentTypeCount(row, courses)
        }
      },
      {
        header: "Resources",
        accessorFn: (row, index) => {
          return getTagContentTypeCount(row, resources)
        }
      },
      {
        header: "Pathways",
        accessorFn: (row, index) => {
          return getTagContentTypeCount(row, pathways)
        }
      },
      {
        ...commonTableCols.actions,
        cell: ({ cell }) => <TagActionsMenu tag={cell.row.original} />,
        width: 300
      }
    ],
    // [courses]
    [courses, resources, pathways]
  );

  const tableProps = {
    tableData,
    tableCols,
    typeName,
    isLoading: loading,
    loadingText: `Loading ${tagType.plural}`,
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
    
  if(error) {
    return <p>Unable to fetch {tagType.plural}.</p>
  }

  return <Table {...tableProps} />

}

export default TagsTable