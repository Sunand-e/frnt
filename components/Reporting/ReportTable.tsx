import {
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
  ColumnDef,
} from '@tanstack/react-table'
import React, { ReactNode, useMemo, useState } from "react";
import LoadingSpinner from "../common/LoadingSpinner";
import { Dot } from "../common/misc/Dot";
import Button from "../common/Button";
import exportToCsv from "../../utils/exportToCsv";
import TableStructure from "../common/tables/TableStructure";
import { useRouter } from "../../utils/router";
import ReportHeader from "./ReportHeader";
import {FileExport} from "@styled-icons/boxicons-solid/FileExport"
import ReportFilters from "./ReportFilters";

export const filterActive = (filterVal: string) => {
  return filterVal && filterVal !== 'all'
}

export const statusAccessor = (row) => {
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
  csvFilename: string,
  title?: ReactNode,
  filters?: any[],
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
  csvFilename = "report",
  title = <>Reports</>,
  filters = [],
  backButton,
}: ReportTableProps) => {
  // const [categoryId, setCategoryId] = useState(null);
  // const [groupId, setGroupId] = useState(null);
  // Table data is memo-ised due to this:
  // https://github.com/tannerlinsley/react-table/issues/1994

  const router = useRouter()

  const { 
    category: categoryId,
    type: type
  } = router.query

  const [sorting, setSorting] = useState<SortingState>([])

  const filterActive = (filterVal: string) => {
    return filterVal && filterVal !== 'all'
  }

  const filteredData = useMemo(() => {
    if (filterActive(categoryId)) {
      return tableData?.filter((edge) => {
        return edge.node.tags.some((tag) => tag.id === categoryId);
      });
    }
    return tableData || []
  },[tableData, categoryId])
    
  const table = useReactTable({
    state: {
      sorting,
    },
    columns: tableCols,
    data: filteredData,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    // debugTable: true,
  });

  const filename = csvFilename.replace(/[^a-z0-9_\-]/gi, "_").toLowerCase();

  const downloadCSV = () => {

    const csvCols = tableCols.filter((col) => col.hideOnCsv !== true);
    const headerRow = csvCols.map((col) => col.header);
    const dataRows = table.getRowModel().rows.map(row => {
      return csvCols.map(col => row.getValue(col.id))
  })

    exportToCsv(`${filename}.csv`, [headerRow, ...dataRows]);
  };

  return (
    <>
      <ReportHeader
        simple={simpleHeader}
        title={title}
      />

      <div className="flex items-center flex-col mb-3 sm:flex-row justify-between">
        <ReportFilters filters={filters} />
        <div className='flex space-x-3'>
          {!!backButton && backButton}
          <Button onClick={() => downloadCSV()}><>Export to CSV<FileExport className="w-5 ml-2 -mr-1" /></></Button>
        </div>
      </div>

      {loading && (
        <LoadingSpinner
          text={
            <>
              {loadingText}
              <Dot>.</Dot>
              <Dot>.</Dot>
              <Dot>.</Dot>
            </>
          }
        />
      )}
      {error && <p>{errorText}</p>}
      {!loading && !error && table && (
        <TableStructure
          table={table}
        />
      )}
    </>
  );
};

export default ReportTable;
