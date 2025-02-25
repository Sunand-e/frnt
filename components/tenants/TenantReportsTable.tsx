import { useQuery } from '@apollo/client';
import { Buildings } from "@styled-icons/boxicons-solid/Buildings";
import { useMemo } from 'react';
import { GET_TENANTS } from '../../graphql/queries/tenants';
import { GetTenants } from '../../graphql/queries/__generated__/GetTenants';
import ItemWithImage from '../common/cells/ItemWithImage';
import Table from '../common/tables/Table';
import ButtonLink from '../common/ButtonLink';
import { useRouter } from '../../utils/router';

const TenantsTable = () => {
  const { loading, error, data: queryData } = useQuery<GetTenants>(GET_TENANTS);

  const tableData = useMemo(() => {
    return queryData?.tenants?.edges?.map(({ node }) => node).filter(node => !node._deleted) || []
  }, [queryData]);

  const tableCols = useMemo(
    () => [
      {
        header: "Tenant",
        cell: ({ cell }) => (
          <ItemWithImage
            imageSrc={cell.row.original.logos.logo_square}
            icon={<Buildings />}
            title={cell.row.original.name}
            rounded="none"
            objectFit="contain"
          />
        )
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
        header: "Credits Issued",
        accessorFn: (row: any) => row.creditsIssued,
      },
      {
        id: "actions",
        header: "",
        hideOnCsv: true,
        width: 300,
        style: {
          width: "300px",
        },
        cell: ({ cell }) => {
          const tenantHref = cell.row.original.id && {
            query: {
              ...useRouter().query,
              tenant: cell.row.original.id
            },
          };

          return (
            <div className="flex space-x-4 justify-center">
              <ButtonLink href={tenantHref}>Download Detail Report</ButtonLink>
            </div>
          );
        },
      },
    ],
    []
  );

  const tableProps = {
    tableData,
    tableCols,
    filters: ['global', 'month'],
    typeName: 'tenant',
    isReportingTable: true,
    exportFilename: 'Tenant Reports',
    isExportable: true,
    showTop: false
  }

  return (
    <Table {...tableProps} />
  );
}

export default TenantsTable
