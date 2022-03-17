import React, { useMemo } from 'react';
import Table from '../../../Table';
import Button from '../../../Button';
import ButtonLink from '../../../ButtonLink';
import LibraryItemTitleCell from './LibraryItemTitleCell';
import useDeleteLibraryItem from '../../../../hooks/libraryItems/useDeleteLibraryItem';
import useGetLibraryItems from '../../../../hooks/libraryItems/useGetLibraryItems';

const LibraryItemsTable = () => {

  const { loading, error, libraryItems } = useGetLibraryItems()
  
  const { deleteLibraryItem } = useDeleteLibraryItem()
  const editUrl = '/admin/library/edit'

  const handleDeleteClick = (id) => {
    deleteLibraryItem(id)
  }

  // Table data is memo-ised due to this:
  // https://github.com/tannerlinsley/react-table/issues/1994
  const tableData = useMemo(
    () => {
      return libraryItems?.filter(item => !item._deleted) || []
    }, [libraryItems]
  );

  // useEffect(() => {
  //   console.log('libraryItems')
  //   console.log(libraryItems)
  //   return libraryItems?.libraryItems.filter(item => !item._deleted) 
  // }, [libraryItems])

   const tableCols = useMemo(
    () => [
      {
        Header: "LibraryItem Name",
        accessor: "title", // accessor is the "key" in the data
        Cell: LibraryItemTitleCell
      },
      {
        Header: "ID",
        accessor: "id",
      },
      {
        width: 300,
        Header: "Actions",
        accessor: "wa",
        Cell: ({ cell }) => {
          const href = cell.row.values.id && `${editUrl}?id=${cell.row.values.id}`

          return (
            <div className="flex space-x-4">
              <ButtonLink href={href}>Edit</ButtonLink>
              <Button 
                onClick={() => handleDeleteClick(cell.row.values.id)}
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