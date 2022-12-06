import React, { useMemo } from 'react';
import Table from '../../common/Table';
import Button from '../../common/Button';
import ButtonLink from '../../common/ButtonLink';
import useGetPathways from '../../../hooks/pathways/useGetPathways';
import useDeletePathway from '../../../hooks/pathways/useDeletePathway';
import LoadingSpinner from '../../common/LoadingSpinner';
import ItemWithImage from '../../common/cells/ItemWithImage';
import { GraduationCap } from 'styled-icons/fa-solid';

const PathwaysTable = () => {

  const { loading, error, pathways } = useGetPathways()
  
  const { deletePathway } = useDeletePathway();

  const editUrl = '/admin/pathways/edit'

  const handleDeleteClick = (id) => {
    deletePathway(id)
  }

  // Table data is memo-ised due to this:
  // https://github.com/tannerlinsley/react-table/issues/1994
  const tableData = useMemo(
    () => {
      return pathways?.edges?.map(edge => edge.node).filter(item => !item._deleted) || []
    }, [pathways]
  );

  // useEffect(() => {
  //   console.log('queryData')
  //   console.log(queryData)
  //   return queryData?.courses.filter(item => !item._deleted) 
  // }, [queryData])

   const tableCols = useMemo(
    () => [
      {
        header: "Pathway",
        accessorKey: "title", // accessor is the "key" in the data
        cell: ({ cell }) => (
          <ItemWithImage
            image={cell.row.original.image}
            icon={<GraduationCap className='p-1'/>}
            title={cell.getValue()}
            secondary={cell.row.original?.tags?.map?.(tag => tag.label).join(', ')}
            // secondary={cell.row.original.title}
            href={
              cell.row.original.shared === false && 
                cell.row.original.id &&
                  `${editUrl}?pid=${cell.row.original.id}`
            }
          />
        )
      },
      {
        header: "Active users",
        accessorFn: row => row.users.totalCount,
        cell: ({ cell }) => {
          let userCount = cell.row.original.users?.totalCount
          return (
            <span>{`${userCount || 0} user${userCount !== 1 ? 's' : ''}`}</span>
          )
        }
      },
      {
        header: "Categories",
        accessorKey: "tags",
        cell: ({ cell }) => {
          const tagString = cell.getValue().map(tag => tag.label).join(', ')
          return (
            <span>{tagString}</span>
          )
        }
      },
      {
        width: 300,
        header: "Actions",
        accessorKey: "wa",
        cell: ({ cell }) => {
          const href = cell.row.original.id && `${editUrl}?pid=${cell.row.original.id}`

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
        <LoadingSpinner />
      )}
      { error && (
        <p>Unable to fetch pathways.</p>
      )}
      { (!loading && !error) && (
        <Table tableData={tableData} tableCols={tableCols} />
      )}
    </>
  );
}

export default PathwaysTable