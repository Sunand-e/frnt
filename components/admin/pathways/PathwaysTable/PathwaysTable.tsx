import React, { useMemo } from 'react';
import Table from '../../../Table';
import Button from '../../../Button';
import ButtonLink from '../../../ButtonLink';
import useGetPathways from '../../../../hooks/pathways/useGetPathway';
import PathwayTitleCell from './PathwayTitleCell';
import useDeletePathway from '../../../../hooks/pathways/useDeletePathway';

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
        Header: "Pathway",
        accessor: "title", // accessor is the "key" in the data
        Cell: PathwayTitleCell
      },
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "Tags",
        accessor: "tags",
        Cell: ({ cell }) => {
          const tagString = cell.value.map(tag => tag.label).join(', ')
          return (
            <span>{tagString}</span>
          )
        }
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

export default PathwaysTable