import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
} from '@tanstack/react-table'
import React, { useMemo, useState } from "react";
import LoadingSpinner from "../common/LoadingSpinner";
import { Dot } from "../common/misc/Dot";
import Button from "../common/Button";
import exportToCsv from "../../utils/exportToCsv";
import TableStructure from "../common/tables/TableStructure";
import { useRouter } from "../../utils/router";
import { client } from "../../graphql/client";
import { gql } from "@apollo/client";
import ReportHeader from "./ReportHeader";
import {FileExport} from "@styled-icons/boxicons-solid/FileExport"
import ReportFilters from "./ReportFilters";
import useUserHasCapability from '../../hooks/users/useUserHasCapability';

export const filterActive = (filterVal) => {
  return filterVal && filterVal !== 'all'
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
}) => {
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

  const filterActive = (filterVal) => {
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
    const headerRow = csvCols.map((col) => col.Header);
    // const dataRows = rows.map((row) =>
    //   csvCols.map((col) => row.values[col.id])
    // );
    // exportToCsv(`${filename}.csv`, [headerRow, ...dataRows]);
  };

  return (
    <>
      <ReportHeader
        simple={simpleHeader}
        title={title}
      />

      <div className="flex items-center flex-col mb-3 sm:flex-row justify-between">
        <ReportFilters filters={filters} />
        <Button onClick={() => downloadCSV()}><>Export to CSV<FileExport className="w-5 ml-2 -mr-1" /></></Button>
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
