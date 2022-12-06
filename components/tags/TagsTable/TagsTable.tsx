import React, { useEffect, useMemo, useState } from 'react';
import Table from '../../common/Table'
import ButtonLink from '../../common/ButtonLink';
import useGetTags from '../../../hooks/tags/useGetTags';
import useDeleteTag from '../../../hooks/tags/useDeleteTag';
import Button from '../../common/Button';
import useGetTagsFull from '../../../hooks/tags/useGetTagsFull';
import ItemWithImage from '../../common/cells/ItemWithImage';

import {Category} from '@styled-icons/material-rounded/Category'
import LoadingSpinner from '../../common/LoadingSpinner';
import useGetCurrentUser from '../../../hooks/users/useGetCurrentUser';

const TagsTable = () => {

  const { tags, loading, error, courses, resources, pathways } = useGetCurrentUser()
  // const { tags: tagsFull } = useGetTagsFull()
  const { deleteTag } = useDeleteTag()

  // const [tags, setTags] = useState([]);

  // useEffect(() => {
  //   if(tagsFull) {
  //     setTags(tagsFull)
  //   } else if(tagsBasic) {
  //     setTags(tagsBasic)
  //   }
  // }, [tagsFull,tagsBasic])

  
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
        header: "Category Name",
        accessorKey: "label", // accessor is the "key" in the data
        cell: ({ cell }) => (
          <ItemWithImage
            image={cell.row.original.image}
            icon={<Category className='p-2' />}
            title={cell.getValue()}
            secondary={cell.row.original.tags?.map(tag => tag.label).join(', ')}
            href={cell.row.original.id && `${editUrl}?id=${cell.row.original.id}`}
            imgDivClass={'bg-main text-white'}
          />
        )
      },
      {
        header: "Item count",
        cell: ({ cell }) => {
          const allItemEdges = [
            ...courses?.edges,
            ...resources?.edges,
            ...pathways?.edges
          ]
          const catItemCount = allItemEdges.filter(
            edge => edge.node.tags.map(
              tag => tag.id
            ).includes(cell.row.original.id)
          ).length

          console.log('catItemCount')
          console.log(catItemCount)
          return (
            <span>{`${catItemCount || 0} item${catItemCount !== 1 ? 's' : ''}`}</span>
          )
        }
      },
      {
        width: 300,
        header: "Actions",
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
    [courses, resources, pathways]
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