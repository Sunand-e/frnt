import { ColumnDef } from '@tanstack/react-table'
import React, { ReactNode, useEffect, useState } from "react";
import LoadingSpinner from "../common/LoadingSpinner";
import { useRouter } from "../../utils/router";
import ReportHeader from "./ReportHeader";
import Table from '../common/tables/Table';
import useIsOrganisationLeader from '../../hooks/users/useIsOrganisationLeader';

export const filterActive = (filterVal: string) => {
  return filterVal && filterVal !== 'all'
}

export const statusAccessor = (row: any) => {
  let map = new Map([
    ["not_started", 'Not started'],
    ["in_progress", 'In progress'],
    ["completed", 'Completed'],
  ]);
  return map.get(row.status) || 'Not started'
}

interface ReportTableProps {
  tableData: any,
  tableCols: ColumnDef<unknown, any>[],
  loadingText?: string,
  errorText?: string,
  simpleHeader?: boolean,
  loading?: any,
  error?: any,
  exportFilename: string,
  title?: ReactNode,
  filters?: string[],
  backButton?: ReactNode
}

const ReportTable = ({
  tableData,
  tableCols,
  loadingText = "Loading...",
  errorText = "Unable to fetch report.",
  simpleHeader=false,
  loading = null,
  error = null,
  exportFilename = "report",
  title = <>Reports</>,
  filters = [],
  backButton,
}: ReportTableProps) => {

  const router = useRouter()

  const { 
    category: categoryId
  } = router.query
  
  const filterActive = (filterVal: string) => {
    return filterVal && filterVal !== 'all'
  }

  const [ filteredData, setFilteredData ] = useState([])

  const { isOrganisationLeader } = useIsOrganisationLeader()
  // if the user is an organisation leader, remove 'group' from the filters array
  let filteredFilters = filters
  if (isOrganisationLeader) {
    filteredFilters = filters.filter(f => f !== 'group')
  }


  useEffect(() => {
    let data
    if (filterActive(categoryId)) {
      data = tableData?.filter((edge: any) => {
        return edge.node.tags.edges.some(({node}) => node.id === categoryId);
      });
    }
    data = tableData || []
    setFilteredData(data)
  },[tableData, categoryId])
  return (
    <>
      <ReportHeader
        simple={simpleHeader}
        title={title}
      />

      {loading && (
        <LoadingSpinner
          text={loadingText} />
      )}
      {error && <p>{errorText}</p>}
      {!loading && !error && (
        <Table
          count={0}
          exportFilename={exportFilename}
          isReportingTable={true}
          isExportable={true}
          showTop={false}
          tableCols={tableCols}
          tableData={filteredData}
          filters={filteredFilters}
          backButton={backButton}
        />
      )}
    </>
  );
};

export default ReportTable;
