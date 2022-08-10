import { useQuery } from '@apollo/client';
import React, { useContext, useMemo } from 'react';
import Table from '../../Table';
import { GET_TENANTS } from '../../../graphql/queries/tenants';
import { GetTenants } from '../../../graphql/queries/__generated__/GetTenants';
import Link from 'next/link';
import ButtonLink from '../../ButtonLink';
import Button from '../../Button';
import { ModalContext } from '../../../context/modalContext';
import ItemWithImageTableCell from '../../common/cells/ItemWithImageTableCell';
import DeleteTenantModal from './DeleteTenantModal';
import dayjs from 'dayjs'

const TenantsTable = () => {

  // const { loading, error, data: queryData } = useQuery<GetUsers>(GET_USERS);
  const { loading, error, data: queryData } = useQuery<GetTenants>(GET_TENANTS);

  const { handleModal } = useContext(ModalContext)
  // Table data is memo-ised due to this:
  // https://github.com/tannerlinsley/react-table/issues/1994
  const tableData = useMemo(() => {
    return queryData?.tenants?.edges?.map(({node}) => node).filter(node => !node._deleted) || []
  }, [queryData]);

  const editUrl = '/admin/tenants/edit'
  const handleDelete = (value) => {
    handleModal({
      title: `Delete tenant`,
      content: <DeleteTenantModal tenantId={value} />
    })
  }

  const tableCols = useMemo(
    () => [
      {
        Header: "Tenant",
        Cell: ({ cell }) => {
          const cellProps = {
            title: cell.row.original.name,
            href: cell.row.original.id && `${editUrl}?id=${cell.row.original.id}`,
            image: cell.row.original.logos.logo_square,
            rounded: "none"
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
              <Button
                onClick={() => handleDelete(cell.row.original.id)}
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
    <Table tableData={tableData} tableCols={tableCols} />
  );
}

export default TenantsTable
