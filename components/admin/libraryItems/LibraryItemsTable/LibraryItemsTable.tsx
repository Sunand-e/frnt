import React, { useMemo } from 'react';
import Table from '../../../Table';
import Button from '../../../Button';
import ButtonLink from '../../../ButtonLink';
import useDeleteLibraryItem from '../../../../hooks/libraryItems/useDeleteLibraryItem';
import useGetLibraryItems from '../../../../hooks/libraryItems/useGetLibraryItems';
import ItemWithImageTableCell from '../../../common/cells/ItemWithImageTableCell';
import { useRouter } from '../../../../utils/router';
import { libraryItemTypes } from '../../../library/libraryItemTypes';

const LibraryItemsTable = () => {

  const { loading, error, libraryItems } = useGetLibraryItems()
  
  const { deleteLibraryItem } = useDeleteLibraryItem()
  const editUrl = '/admin/library/edit'

  const handleDeleteClick = (id) => {
    deleteLibraryItem(id)
  }

  // Table data is memo-ised due to this:
  // https://github.com/tannerlinsley/react-table/issues/1994

  const router = useRouter()
  const { search, category, type } = router.query

  let filteredItems = [];
  if(search) {
    const textResultsObject = libraryItems?.reduce(
      (filtered,item) => {
        if(item.title.toLowerCase().indexOf(search.toLowerCase()) !== -1) {
          return {
            ...filtered,
            title: filtered.title.concat([item])
          }
          // } else if(item.excerpt.toLowerCase().indexOf(search.toLowerCase()) !== -1) {
            //   return {
              //     ...filtered,
              //     excerpt: filtered.excerpt.concat([item])
              //   }
              // } else if(item.content.toLowerCase().indexOf(search.toLowerCase()) !== -1) {
                //   return {
                  //     ...filtered,
        //     content: filtered.content.concat([item])
        //   }
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
    filteredItems = libraryItems ?? filteredItems;
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
  //   console.log('libraryItems')
  //   console.log(libraryItems)
  //   return libraryItems?.libraryItems.filter(item => !item._deleted) 
  // }, [libraryItems])

   const tableCols = useMemo(
    () => [
      {
        Header: "Library Item",
        accessor: "title", // accessor is the "key" in the data
        Cell: ({ cell }) => {
          const cellProps = {
            image: cell.row.original.image?.location,
            title: cell.value,
            secondary: cell.row.original.contentType,
            href: cell.row.original.id && `${editUrl}?id=${cell.row.original.id}`
          }
          return (
            <ItemWithImageTableCell { ...cellProps } />
          )
        }
      },
      // {
      //   Header: "ID",
      //   accessor: "id",
      // },
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

export default LibraryItemsTable