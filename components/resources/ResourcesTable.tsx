import React, { useMemo } from 'react';
import useGetResources from '../../hooks/resources/useGetResources';
import ItemWithImage from '../common/cells/ItemWithImage';
import { useRouter } from '../../utils/router';
import { resourceTypes } from '../resources/resourceTypes';
import LoadingSpinner from '../common/LoadingSpinner';
import { Dot } from '../common/misc/Dot';
import { startCase } from 'lodash';
import useGetThumbnail from '../common/items/useGetThumbnail';
import { getIconFromFilename } from '../../utils/getIconFromFilename';
import Table from '../common/tables/Table';
import ResourceActionsMenu from './ResourceActionsMenu';

const ResourcesTable = () => {

  const { loading, error, resources } = useGetResources()
  
  const editUrl = '/admin/resources/edit'

  // Table data is memo-ised due to this:
  // https://github.com/tannerlinsley/react-table/issues/1994

  const router = useRouter()
  const { search, category, type } = router.query

  let filteredItems = [];
  if(search) {
    const textResultsObject = resources?.edges?.map(edge => edge.node).reduce(
      (filtered,node) => {
        if(node.title.toLowerCase().indexOf(search.toLowerCase()) !== -1) {
          return {
            ...filtered,
            title: filtered.title.concat([node])
          }
        } else {
          return filtered
        }
      },
      {
        title: [],
        excerpt: [],
        content: []
      }
    ) || {
      title: [],
      excerpt: [],
      content: []
    }

    filteredItems = textResultsObject.title.concat(textResultsObject.excerpt, textResultsObject.content)
  } else {
    filteredItems = resources?.edges?.map(edge => edge.node) ?? filteredItems;
  }

  if(category) {
    filteredItems = filteredItems.filter(item => {
      const isSelectedCategory = tag => {
        return tag.tagType === 'category' && tag.label === category
      }
      return item?.tags && item.tags.some(isSelectedCategory);   
    });
  }

  if(type) {
    filteredItems = filteredItems.filter(item => item.contentType === type);
  }

  const resultCountString = `${filteredItems.length || 'No'} item${filteredItems.length !== 1 ? 's' : ''} found`

  const tableData = useMemo(
    () => {
      return filteredItems?.filter(item => !item._deleted) || []
    }, [filteredItems]
  );

  // useEffect(() => {
  //   console.log('resources')
  //   console.log(resources)
  //   return resources?.resources.filter(item => !item._deleted) 
  // }, [resources])

   const tableCols = useMemo(
    () => [
      {
        header: "Resource",
        accessorKey: "title", // accessor is the "key" in the data
        cell: ({ cell }) => {
          const { src } = useGetThumbnail(cell.row.original, 50)
          const { contentType } = cell.row.original
          const rounded = (!src && contentType === 'document') ? 'none' : 'full'
          const IconComponent = (contentType === 'document') ? (
            getIconFromFilename(cell.row.original.document?.fileName)
          ) : (
            resourceTypes[contentType]?.icon
          )

          const cellProps = {
            image: cell.row.original.image,
            imageSrc: src,
            icon: IconComponent ? <IconComponent /> : null,
            rounded,
            title: cell.getValue(),
            secondary: startCase(cell.row.original.contentType),
            href: cell.row.original.id && `${editUrl}?id=${cell.row.original.id}`
          }
          return (
            <ItemWithImage { ...cellProps } />
          )
        }
      },
      {
        header: "Description",
        cell: ({ cell }) => {
          const html = cell.row.original.content?.description?.replace(/<\/?[^>]+(>|$)/g, "") || null;
          return <span className="text-left" dangerouslySetInnerHTML={{ __html: html }}></span>
        },
      },
      {
        id: 'category',
        header: "Category",
        accessorFn: row => {
          return row.tags?.filter(tag => (
            tag.tagType === 'category'
          )).map(tag => tag.label).join(', ') || '-'
        },
      },
      {
        width: 300,
        header: "Actions",
        accessorKey: "actions",
        cell: ({ cell }) => <ResourceActionsMenu resource={cell.row.original} />
      }
    ],
    []
  );

  return (
    <>
      { loading && <LoadingSpinner text={(
        <>
          Loading resources
          <Dot>.</Dot>
          <Dot>.</Dot>
          <Dot>.</Dot>
        </>
      )} /> }
      { error && (
        <p>Unable to fetch resources.</p>
      )}
      { (!loading && !error) && (
        <Table tableData={tableData} tableCols={tableCols} />
      )}
    </>
  );
}

export default ResourcesTable