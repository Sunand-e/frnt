import { useQuery } from '@apollo/client';
import React, { useContext, useMemo } from 'react';
import Table from '../../Table';
import { GET_BULK_IMPORTS } from '../../../graphql/queries/bulkImports';
import { GetBulkImports } from '../../../graphql/queries/__generated__/GetBulkImports';
import Link from 'next/link';
import ButtonLink from '../../ButtonLink';
import Button from '../../Button';
import { ModalContext } from '../../../context/modalContext';
import ItemWithImageTableCell from '../../common/cells/ItemWithImageTableCell';
import dayjs from 'dayjs'

const BulkImportsTable = () => {

  // const { loading, error, data: queryData } = useQuery<GetUsers>(GET_USERS);
  const { loading, error, data: queryData } = useQuery<GetBulkImports>(GET_BULK_IMPORTS);

  const { handleModal } = useContext(ModalContext)
  // Table data is memo-ised due to this:
  // https://github.com/tannerlinsley/react-table/issues/1994
  const tableData = useMemo(() => {
    return queryData?.bulkImports?.edges?.map(({node}) => node) || []
  }, [queryData]);

  const editUrl = '/admin/bulkImports/edit'

  const tableCols = useMemo(
    () => [
      {
        Header: "BulkImport",
        Cell: ({ cell }) => {
          const cellProps = {
            title: cell.row.original.name,
            href: cell.row.original.id && `${editUrl}?id=${cell.row.original.id}`,
            image: cell.row.original.logos.logo_square,
            rounded: "none",
            objectFit: 'fill'
          }
          return (
            <ItemWithImageTableCell { ...cellProps } />
          )
        }
      },
      {
        Header: "URL",
        accessor: "url",
        Cell: ({ cell }) => {
          const domainUrl = `${location.protocol}//${cell.value}`
          const port = location.port && `:${location.port}`
          return (
              <a href={domainUrl + port}>{cell.value}</a>
          )
        },
      },
      {
        Header: "Date Created",
        accessor: "createdAt",
        Cell: ({ cell }) => {
          return (
              dayjs(cell.value).format('DD/MM')
          )
        }
      },
      {
        Header: "Date Updated",
        accessor: "updatedAt",
        Cell: ({ cell }) => {
          return (
              dayjs(cell.value).format('DD/MM')
          )
        }
      },
      {
        width: 300,
        Header: "Actions",
        // className: 'text-center',
        Cell: ({ cell }) => {
          const href = cell.row.original.id && `${editUrl}?id=${cell.row.original.id}`
          return (          
            <div className="space-x-4">
              <ButtonLink href={href}>Edit</ButtonLink>
            </div>
          )
        }
      }
    ],
    []
  );

  return (
    <Table tableData={tableData} tableCols={tableCols} />
  );
}

export default BulkImportsTable
