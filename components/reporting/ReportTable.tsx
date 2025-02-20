import {
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
  ColumnDef,
} from "@tanstack/react-table";
import React, { ReactNode, useEffect, useMemo, useState } from "react";
import LoadingSpinner from "../common/LoadingSpinner";
import { Dot } from "../common/misc/Dot";
import Button from "../common/Button";
import exportToCsv from "../../utils/exportToCsv";
import Table from "../common/tables/Table";
import { useRouter } from "../../utils/router";
import ReportHeader from "./ReportHeader";
import useIsOrganisationLeader from "../../hooks/users/useIsOrganisationLeader";
import useGetReports from "../../hooks/reports/useGetReports";

export const filterActive = (filterVal: string | undefined | null) => {
  return filterVal && filterVal !== "all";
};

export const statusAccessor = (row: { status?: string }) => {
  const statusMap = new Map([
    ["not_started", "Not started"],
    ["in_progress", "In progress"],
    ["completed", "Completed"],
  ]);
  return statusMap.get(row.status || "") || "Not started";
};

interface ReportTableProps {
  loadingText?: string;
  errorText?: string;
  simpleHeader?: boolean;
  exportFilename: string;
  title?: ReactNode;
  filters?: string[];
  backButton?: ReactNode;
  tableCols: ColumnDef<any>[];
  tableData: any[];
  loading: boolean;
  error: boolean;
}

const ReportTable = ({
  loadingText = "Loading...",
  errorText = "Unable to fetch report.",
  simpleHeader = false,
  exportFilename = "report",
  title = <>Reports</>,
  filters = [],
  backButton,
  tableCols = [],
  tableData = [],
  loading,
  error,
}: ReportTableProps) => {
  const router = useRouter();
  const { reports, loadMore } = useGetReports();
  const hasNextPage = reports?.pageInfo?.hasNextPage ?? false;
  const { isOrganisationLeader } = useIsOrganisationLeader();

  const categoryId = useMemo(() => {
    const category = router.query.category;
    return Array.isArray(category) ? category[0] : category || null;
  }, [router.query]);


  const [sorting, setSorting] = useState<SortingState>([]);

  const filteredData = useMemo(() => {
    if (filterActive(categoryId)) {
      return tableData?.filter((edge) =>
        edge.node.tags.edges.some(({ node }) => node.id === categoryId)
      );
    }
    return tableData || [];
  }, [tableData, categoryId]);

  const filteredFilters = useMemo(
    () => (isOrganisationLeader ? filters.filter((f) => f !== "group") : filters),
    [filters, isOrganisationLeader]
  );



  useEffect(() => {
    const handleScroll = () => {
      if (hasNextPage && !loading && window.innerHeight + window.scrollY >= document.body.offsetHeight - 50) {
        loadMore();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasNextPage, loading, loadMore]);

  return (
    <>
      <ReportHeader simple={simpleHeader} title={typeof title === "string" ? title : "Reports"} />

      {loading && <LoadingSpinner text={loadingText} />}
      {error && <p>{errorText}</p>}

      {!loading && !error && filteredData.length === 0 && <p>No reports available.</p>}

      {!loading && !error && filteredData.length > 0 && (
        <>
          <Table
            exportFilename={exportFilename}
            isReportingTable={true}
            isExportable={true}
            showTop={false}
            tableCols={tableCols}
            tableData={filteredData}
            filters={filteredFilters}
            backButton={backButton}
            scrollInTable={false}
          />

          {hasNextPage && <LoadingSpinner text="Loading more..." />}

          {hasNextPage && (
            <button
              onClick={loadMore}
              style={{
                margin: "20px auto",
                display: "block",
                padding: "10px",
                cursor: "pointer",
              }}
            >
              Load More
            </button>
          )}
        </>
      )}
    </>
  );
};

export default ReportTable;
