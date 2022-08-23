import React, { useMemo } from 'react';
import Table from '../Table';
import Button from '../Button';
import ButtonLink from '../ButtonLink';
import useDeleteResource from '../../hooks/resources/useDeleteResource';
import useGetResources from '../../hooks/resources/useGetResources';
import ItemWithImageTableCell from '../common/cells/ItemWithImageTableCell';
import { useRouter } from '../../utils/router';
import { resourceTypes } from '../resources/resourceTypes';

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
      return item.tags && item.tags.some(isSelectedCategory);   
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
        Header: "Resource",
        accessor: "title", // accessor is the "key" in the data
        Cell: ({ cell }) => {

          const IconComponent = resourceTypes[cell.row.original.contentType].icon

          const cellProps = {
            image: cell.row.original.image?.location,
            icon: <IconComponent />,
            title: cell.value,
            secondary: cell.row.original.contentType,
            href: cell.row.original.id && `${editUrl}?id=${cell.row.original.id}`
          }
          return (
            <ItemWithImageTableCell { ...cellProps } />
          )
        }
      },
      {
        Header: "Description",
        Cell: ({ cell }) => {
          return cell.row.original.content?.description.replace(/<\/?[^>]+(>|$)/g, "");
        },
      },
      {
        width: 300,
        Header: "Actions",
        accessor: "wa",
        Cell: ({ cell }) => {
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
      { loading && (
        <p>loading</p>
      )}
      { error && (
        <p>error</p>
      )}
      { (!loading && !error) && (
        <Table tableData={tableData} tableCols={tableCols} />
      )}
    </>
  );
}

export default ResourcesTable