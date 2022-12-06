import React, { useMemo } from 'react';
import Table from '../common/Table';
import Button from '../common/Button';
import ButtonLink from '../common/ButtonLink';
import useDeleteResource from '../../hooks/resources/useDeleteResource';
import useGetResources from '../../hooks/resources/useGetResources';
import ItemWithImage from '../common/cells/ItemWithImage';
import { useRouter } from '../../utils/router';
import { resourceTypes } from '../resources/resourceTypes';
import LoadingSpinner from '../common/LoadingSpinner';
import { Dot } from '../common/misc/Dot';
import { startCase } from 'lodash';
import Categories from '../categories/Categories';
import useGetThumbnail from '../common/items/useGetThumbnail';
import { getIcon } from 'react-toastify/dist/components';
import { getIconFromFilename } from '../../utils/getIconFromFilename';

const ResourcesTable = () => {

  const { loading, error, resources } = useGetResources()
  
  const { deleteResource } = useDeleteResource()
  const editUrl = '/admin/resources/edit'

  const handleDeleteClick = (id) => {
    deleteResource(id)
  }

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
  console.log('filteredItems1')
  console.log(filteredItems)

  if(category) {
    filteredItems = filteredItems.filter(item => {
      const isSelectedCategory = tag => {
        return tag.tagType === 'category' && tag.label === category
      }
      return item?.tags && item.tags.some(isSelectedCategory);   
    });
  }
  console.log('filteredItems2')
  console.log(filteredItems)

  if(type) {
    filteredItems = filteredItems.filter(item => item.contentType === type);
  }

  console.log('filteredItems3')
  console.log(filteredItems)

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
          return <span dangerouslySetInnerHTML={{ __html: html }}></span>
        },
      },
      {
        id: 'category',
        header: "Category",
        accessorFn: row => {
          return row.tags?.filter(tag => (
            tag.tagType === 'category'
          )).map(tag => tag.label).join(', ') || <span>&mdash;</span>
        },
      },
      {
        width: 300,
        header: "Actions",
        accessorKey: "wa",
        cell: ({ cell }) => {
          const href = cell.row.original.id && `${editUrl}?id=${cell.row.original.id}`

          return (
            <div className="flex space-x-4 justify-center">
              <ButtonLink href={href}>Edit</ButtonLink>
              <Button 
                onClick={() => handleDeleteClick(cell.row.original.id)}
              >
                Delete
              </Button>
            </div>
          )
        }
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