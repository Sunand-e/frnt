import { useQuery } from '@apollo/client';
import { Buildings } from "@styled-icons/boxicons-solid/Buildings";
import { useMemo, useState } from 'react';
import { GET_TENANTS_REPORT } from '../../graphql/queries/tenants';
import { GetTenants } from '../../graphql/queries/__generated__/GetTenants';
import ItemWithImage from '../common/cells/ItemWithImage';
import Table from '../common/tables/Table';

const TenantReportsTable = () => {
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());

  const { loading, data: queryData } = useQuery<GetTenants>(GET_TENANTS_REPORT, {
    variables: {
      month: month,
      year: year
    },
    skip: !month || !year,
    fetchPolicy: "cache-and-network",
  });

  const tableData = useMemo(() => {
    return queryData?.tenantReports?.edges?.map(({ node }) => node) || []
  }, [queryData]);

  const tableCols = useMemo(
    () => [
      {
        id: "title",
        header: "Tenant",
        accessorFn: (row: any) => row.name,
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
        id: "active_user",
        header: "Active User",
        accessorFn: (row: any) => row.activeUsers,
      },
      {
        id: "total_assigned_courses",
        header: "Total Assigned Courses",
        accessorFn: (row: any) => row.totalAssignedCourses,
      },
      {
        id: "course_access_frequency",
        header: "Course Access Frequency",
        accessorFn: (row: any) => row.courseAccessFrequency,
      },
      {
        id: "users",
        header: "Users",
        accessorFn: (row: any) => row.users.totalCount,
      },
      {
        id: "courses",
        header: "Courses",
        accessorFn: (row: any) => row.courses.totalCount,
      },
      {
        id: "groups",
        header: "Groups",
        accessorFn: (row: any) => row.groups.totalCount,
      },
      {
        id: "credits_issued",
        header: "Credits Issued",
        accessorFn: (row: any) => row.creditsIssued,
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
    showTop: false,
    isLoading: loading,
    loadingText: 'Loading Tenants Report',
    setMonthFilter: setMonth,
    setYearFilter: setYear,
  }

  return (
    <Table {...tableProps} />
  );
}

export default TenantReportsTable
