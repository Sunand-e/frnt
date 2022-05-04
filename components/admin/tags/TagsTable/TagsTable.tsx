import React, { useMemo } from 'react';
import Table from '../../../Table';
import ButtonLink from '../../../ButtonLink';
import TagLabelCell from './TagLabelCell';
import useGetTags from '../../../../hooks/tags/useGetTags';
import useDeleteTag from '../../../../hooks/tags/useDeleteTag';
import Button from '../../../Button';

const TagsTable = () => {

  const { tags, loading, error } = useGetTags()
  
  const { deleteTag } = useDeleteTag()

  const handleDeleteClick = (id) => {
    deleteTag(id)
  }

  const editUrl = '/admin/tags/edit'

  // Table data is memo-ised due to this:
  // https://github.com/tannerlinsley/react-table/issues/1994
  const tableData = useMemo(
    () => {
      return tags?.filter(item => !item._deleted) || []
    }, [tags]
  );

   const tableCols = useMemo(
    () => [
      {
        Header: "Tag Name",
        accessor: "label", // accessor is the "key" in the data
        Cell: TagLabelCell
      },
      {
        Header: "Tag Type",
        accessor: "tagType",
      },
      {
        width: 300,
        Header: "Actions",
        accessor: "wa",
        Cell: ({ cell }) => {
          const href = cell.row.original.id && `${editUrl}?id=${cell.row.original.id}`
          return (
            <div className="flex space-x-4">
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

export default TagsTable