import { useQuery } from '@apollo/client';
import React, { useMemo } from 'react';
import Table from '../common/tables/Table';
import { GET_BULK_IMPORTS } from '../../graphql/queries/bulkImports';
import { GetBulkImports } from '../../graphql/queries/__generated__/GetBulkImports';
import Link from 'next/link';
import ButtonLink from '../common/ButtonLink';
import dayjs from 'dayjs'

const BulkImportsTable = () => {

  // const { loading, error, data: queryData } = useQuery<GetUsers>(GET_USERS);
  const { loading, error, data: queryData } = useQuery<GetBulkImports>(GET_BULK_IMPORTS);

  // Table data is memo-ised due to this:
  // https://github.com/tannerlinsley/react-table/issues/1994
  const tableData = useMemo(() => {
    return queryData?.bulkImports || []
  }, [queryData]);

  const editUrl = '/admin/bulkImports/edit'

  const tableCols = useMemo(
    () => [
      {
        header: "BulkImport",
        cell: ({ cell }) => {
          const href = cell.row.original.id && `${editUrl}?id=${cell.row.original.id}`
          return (
            (<Link href={href ?? '#'} className="font-medium text-gray-900">

              {cell.row.original.name}

            </Link>)
          );
        }
      },
      {
        header: "User count",
        accessorKey: "users",
        cell: ({ cell }) => cell.getValue().length
      },
      {
        header: "Date Uploaded",
        accessorKey: "createdAt",
        cell: ({ cell }) => {
          return (
              dayjs(cell.getValue()).format('DD/MM')
          )
        }
      },
      {
        width: 300,
        header: "Actions",
        // className: 'text-center',
        cell: ({ cell }) => {
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
