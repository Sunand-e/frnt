import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import { useMemo } from "react";
import { useTable, useSortBy } from "react-table";
import { GET_GROUPS } from "../graphql/queries/allQueries";

const Table = ({tableData, tableCols}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns: tableCols, data: tableData }, useSortBy);

  return (
    <div className="flex flex-col mb-8">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table
              {...getTableProps()}
              className="min-w-full divide-y divide-gray-200"
            >
              <thead className="bg-gray-50">
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column, index) => (
                      <th {...column.getHeaderProps(column.getSortByToggleProps())}
                        className={`px-6 py-3 ${index > 0 ? 'text-center' : 'text-left'} text-xs font-medium text-gray-500 uppercase tracking-wider`}
                      >
                        {column.render("Header")}
                        <span>
                        {column.isSorted
                          ? column.isSortedDesc
                            ? ' 🔽'
                            : ' 🔼'
                          : ''}
                        </span>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody className="bg-white divide-y divide-gray-200" {...getTableBodyProps()}>
                {rows.map((row) => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()}>
                      {row.cells.map((cell, index) => {
                        return (
                          <td
                            {...cell.getCellProps()}
                            className={`px-6 py-4 ${index > 0 ? 'text-center' : 'text-left'} whitespace-nowrap text-sm text-gray-900`}
                          >
                            {cell.render("Cell")}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Table