import React, { useMemo } from 'react';
import useGetResources from '../../hooks/resources/useGetResources';
import ItemWithImage from '../common/cells/ItemWithImage';
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

  
  let filteredItems = resources?.edges?.map(edge => edge.node)

  const tableData = useMemo(
    () => {
      return filteredItems?.filter(item => !item._deleted) || []
    }, [filteredItems]
  );

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
        width: '100',
        cell: ({ cell }) => {
          const html = cell.row.original.content?.description?.replace(/<\/?[^>]+(>|$)/g, "") || null;
          return <span className="text-left" dangerouslySetInnerHTML={{ __html: html }}></span>
        },
      },
      {
        id: 'category',
        header: "Category",
        width: 300,
        accessorFn: row => {
          return row.tags?.filter(tag => (
            tag.tagType === 'category'
          )).map(tag => tag.label).join(', ') || '-'
        },
      },
      {
        header: "Actions",
        accessorKey: "actions",
        cell: ({ cell }) => <ResourceActionsMenu resource={cell.row.original} />
      }
    ],
    []
  );

  const tableProps = {
    tableData,
    tableCols,
    selectable: true,
    enableRowSelection: true,
    typeName: 'resource',
    filters: ['category', 'global', 'contentType'],
    typeOptions: resourceTypes
  }

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
        <Table {...tableProps} />
      )}
    </>
  );
}

export default ResourcesTable