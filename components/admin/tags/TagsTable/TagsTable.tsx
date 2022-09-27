import React, { useEffect, useMemo, useState } from 'react';
import Table from '../../../Table';
import ButtonLink from '../../../ButtonLink';
import TagLabelCell from './TagLabelCell';
import useGetTags from '../../../../hooks/tags/useGetTags';
import useDeleteTag from '../../../../hooks/tags/useDeleteTag';
import Button from '../../../Button';
import useGetTagsFull from '../../../../hooks/tags/useGetTagsFull';
import ItemWithImageTableCell from '../../../common/cells/ItemWithImageTableCell';

import {Category} from '@styled-icons/material-rounded/Category'
import LoadingSpinner from '../../../LoadingSpinner';

const TagsTable = () => {

  const { tags: tagsBasic, loading, error } = useGetTags()
  const { tags: tagsFull } = useGetTagsFull()
  const { deleteTag } = useDeleteTag()

  const [tags, setTags] = useState([]);

  useEffect(() => {
    if(tagsFull) {
      setTags(tagsFull)
    } else if(tagsBasic) {
      setTags(tagsBasic)
    }
  }, [tagsFull,tagsBasic])

  
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
        Header: "Category Name",
        accessor: "label", // accessor is the "key" in the data
        Cell: ({ cell }) => {
          const cellProps = {
            ...(cell.row.original.image?.location ?
              { image: cell.row.original.image?.location } :
              { icon: <Category /> } 
            ),
            title: cell.value,
            secondary: cell.row.original.tags?.map(tag => tag.label).join(', '),
            // secondary: cell.row.original.title,
            href: cell.row.original.id && `${editUrl}?id=${cell.row.original.id}`,
            imgDivClass: 'bg-main text-white p-2'
          }
          return (
            <ItemWithImageTableCell { ...cellProps } />
          )
        }
      },
      {
        Header: "Item count",
        Cell: ({ cell }) => {
          let contentCount = cell.row.original.courses?.length
          return (
            <span>{`${contentCount || 0} item${contentCount !== 1 ? 's' : ''}`}</span>
          )
        }
      },
      {
        width: 300,
        Header: "Actions",
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
        <LoadingSpinner />
      )}
      { error && (
        <p>Unable to fetch tags.</p>
      )}
      { (!loading && !error) && (
        <Table tableData={tableData} tableCols={tableCols} />
      )}
    </>
  );
}

export default TagsTable