import { useQuery } from '@apollo/client';
import { Buildings } from "@styled-icons/boxicons-solid/Buildings";
import dayjs from 'dayjs';
import { useMemo } from 'react';
import { GET_TENANTS } from '../../graphql/queries/tenants';
import { GetTenants } from '../../graphql/queries/__generated__/GetTenants';
import { commonTableCols } from '../../utils/commonTableCols';
import ItemWithImage from '../common/cells/ItemWithImage';
import Table from '../common/tables/Table';
import TenantActionsMenu from './TenantActionsMenu';

const TenantsTable = () => {

  // const { loading, error, data: queryData } = useQuery<GetUsers>(GET_USERS);
  const { loading, error, data: queryData } = useQuery<GetTenants>(GET_TENANTS);

  // Table data is memo-ised due to this:
  // https://github.com/tannerlinsley/react-table/issues/1994
  const tableData = useMemo(() => {
    return queryData?.tenants?.edges?.map(({ node }) => node).filter(node => !node._deleted) || []
  }, [queryData]);

  const editUrl = '/admin/tenants/edit'

  const tableCols = useMemo(
    () => [
      {
        header: "Tenant",
        accessorFn: (row: any) => row.name,
        cell: ({ cell }) => (
          <ItemWithImage
            imageSrc={cell.row.original.logos.logo_square}
            icon={<Buildings />}
            title={cell.row.original.name}
            href={cell.row.original.id && `${editUrl}?id=${cell.row.original.id}`}
            // imgDivClass={'bg-main text-white p-2'}
            rounded="none"
            objectFit="contain"
          />
        )
      },
      {
        header: "URL",
        accessorKey: "url",
        cell: ({ cell }) => {
          const domainUrl = `${location.protocol}//${cell.getValue()}`
          const port = location.port && `:${location.port}`
          return (
            <a href={domainUrl + port}>{cell.getValue()}</a>
          )
        },
      },
      {
        header: "Users",
        accessorFn: (row: any) => row.users.totalCount,
      },
      {
        header: "Courses",
        accessorFn: (row: any) => row.courses.totalCount,
      },
      {
        header: "Groups",
        accessorFn: (row: any) => row.groups.totalCount,
      },
      {
        header: "Credits Issued",
        accessorFn: (row: any) => row.creditsIssued,
      },
      {
        header: "Date Created",
        accessorKey: "createdAt",
        cell: ({ cell }) => {
          return (
            dayjs(cell.getValue()).format('DD/MM')
          )
        }
      },
      {
        ...commonTableCols.actions,
        cell: ({ cell }) => <TenantActionsMenu tenant={cell.row.original} />,
        width: 300
      }
    ],
    []
  );

  const tableProps = {
    tableData,
    tableCols,
    filters: ['global'],
    typeName: 'tenant'
  }

  return (
    <Table {...tableProps} />
  );
}

export default TenantsTable
