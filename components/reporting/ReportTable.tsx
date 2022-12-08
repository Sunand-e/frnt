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
    user: userId, 
    group: groupId, 
    course: courseId, 
    lesson: lessonId, 
    category: categoryId,
    type: type
  } = router.query

  const reportType = ['course','user','group'].includes(type as string) ? type : 'course'

  const filterActive = (filterVal) => {
    return filterVal && filterVal !== 'all'
  }

  // alert(reportType)
  const filteredData = useMemo(() => {
    let data;
    if(!tableData) {
      return [];
    }
    if (reportType === "user") {
      data = tableData.filter((item) => !item.node._deleted);
      if (filterActive(groupId)) {
        data = data?.filter((item) => {
          return item.node.groups.edges.some(
            (groupEdge) => groupEdge.node.id === groupId
          );
        });
      }
    } else if (reportType === "course") {
      data = tableData.filter((item) => !item.node._deleted);
      if (filterActive(groupId)) {
        data = data?.filter((item) => {
          const fragment = client.readFragment({
            id: `UserContentEdge:${item.userId}:${item.node.id}`,
            fragment: gql`
              fragment UserContentGroupFragment on UserContentEdge {
                groups {
                  edges {
                    node {
                      id
                    }
                  }
                }
              }
            `,
          });

          const groupIds = fragment?.groups.edges.map((edge) => edge.node.id);
          return groupIds?.some((id) => id === groupId);
        });
      }
      if (filterActive(categoryId)) {
        data = data?.filter((item) => {
          return item.node.tags.some((tag) => tag.id === categoryId);
        });
      }
    }

    return data || [];
    // return tableData || [];

  }, [tableData, groupId]);

  

  const [sorting, setSorting] = useState<SortingState>([])

  const table = useReactTable({
    state: {
      sorting,
    },
    columns: tableCols, 
    data: filteredData,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
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
console.log('table')
!!table && console.log('aa')
console.log(table)
console.log(table.getHeaderGroups())
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
