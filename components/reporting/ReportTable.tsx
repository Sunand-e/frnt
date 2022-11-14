import React, { useMemo, useState } from "react";
import TagSelect from "../tags/inputs/TagSelect";
import LoadingSpinner from "../common/LoadingSpinner";
import { Dot } from "../common/misc/Dot";
import Button from "../common/Button";
import exportToCsv from "../../utils/exportToCsv";
import { useTable, useSortBy } from "react-table";
import TableStructure from "../common/TableStructure";
import { C } from "styled-icons/fa-solid";
import GroupSelect from "../groups/inputs/GroupSelect";
import { client } from "../../graphql/client";
import { gql } from "@apollo/client";
import useGetCurrentUser from "../../hooks/users/useGetCurrentUser";
import Link from "next/link";

const ReportTable = ({
  tableData = [],
  titleBreadcrumbs,
  reportItemType,
  tableCols,
  loadingText = "Loading...",
  errorText = "Unable to fetch report.",
  loading = null,
  error = null,
  csvFilename = "report",
  categoryFilter = false,
  groupFilter = false,
}) => {
  const [categoryId, setCategoryId] = useState(null);
  const [groupId, setGroupId] = useState(null);
  // Table data is memo-ised due to this:
  // https://github.com/tannerlinsley/react-table/issues/1994
  const filteredData = useMemo(() => {
    let data;
    if (reportItemType === "user") {
      data = tableData.filter((item) => !item.node._deleted);
      if (groupId) {
        data = data?.filter((item) => {
          return item.node.groups.edges.some(
            (groupEdge) => groupEdge.node.id === groupId
          );
        });
      }
    } else if (reportItemType === "contentUser") {
      data = tableData.filter((item) => !item.node._deleted);
      if (groupId) {
        data = data?.filter((item) => {
          const fragment = client.readFragment({
            id: `UserContentEdge:${item.userId}:${item.node.id}`,
            fragment: gql`
              fragment GroupFragment on UserContentEdge {
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
          return groupIds.some((id) => id === groupId);
        });
      }
    } else if (reportItemType === "content") {
      data = tableData.filter((item) => !item.node._deleted);
      if (categoryId) {
        data = data?.filter((item) => {
          return item.node.tags.some((tag) => tag.id === categoryId);
        });
      }
      if (groupId) {
        data = data?.filter((item) => {
          const fragment = client.readFragment({
            id: `UserContentEdge:${item.userId}:${item.node.id}`,
            fragment: gql`
              fragment GroupFragment on UserContentEdge {
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
          return groupIds.some((id) => id === groupId);
        });
      }
    }
    return data || [];
  }, [tableData, categoryId, groupId]);

  const clearFilters = () => {
    setCategoryId(null);
    setGroupId(null);
  };

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns: tableCols, data: filteredData }, useSortBy);

  const filename = csvFilename.replace(/[^a-z0-9_\-]/gi, "_").toLowerCase();

  const downloadCSV = () => {
    const csvCols = tableCols.filter((col) => col.hideOnCsv !== true);
    const headerRow = csvCols.map((col) => col.Header);
    const dataRows = rows.map((row) =>
      csvCols.map((col) => row.values[col.id])
    );
    exportToCsv(`${filename}.csv`, [headerRow, ...dataRows]);
  };

  const TitleBreadcrumb = ({ text, link = null }) => {
    const linkWrapped = (
      <Link
        href={link}
        className="border-b-4 border-main pb-0.5 hover:border-none"
      >
        {text}
      </Link>
    );

    return link ? linkWrapped : text;
  };

  const title = titleBreadcrumbs
    .map(({ text, link }, index) => <TitleBreadcrumb text={text} link={link} />)
    .reduce((prev, curr) => [prev, <span> &mdash; </span>, curr]);

  return (
    <>
      <div className="flex items-center flex-col mb-3 sm:flex-row justify-between">
        <h3 className="text-main-secondary font-semibold text-center mb-1 sm:text-left">
          {title}
        </h3>
        <div className="flex items-center flex-col sm:flex-row space-x-2">
          {!!categoryFilter && (
            <TagSelect
              selected={categoryId}
              tagType={`category`}
              onSelect={(tag) => setCategoryId(tag.id)}
            />
          )}
          {!!groupFilter && (
            <GroupSelect
              selected={groupId}
              onSelect={(group) => setGroupId(group.id)}
            />
          )}
          {(groupFilter || categoryFilter) && (
            <span
              className={`text-main-secondary hover:text-main p-1 px-3 cursor-pointer`}
              onClick={clearFilters}
            >
              clear filters
            </span>
          )}

          <Button onClick={() => downloadCSV()}>Export to CSV</Button>
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
      {!loading && !error && (
        <TableStructure
          getTableProps={getTableProps}
          getTableBodyProps={getTableBodyProps}
          headerGroups={headerGroups}
          rows={rows}
          prepareRow={prepareRow}
        />
      )}
    </>
  );
};

export default ReportTable;
