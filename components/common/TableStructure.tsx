import { flexRender } from "@tanstack/react-table";

const TableStructure = ({table}) => {
  
  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
           <table className="min-w-full divide-y divide-gray-200 bg-white">
              <thead className="bg-gray-50">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header, index) => (
                      <th key={header.id} colSpan={header.colSpan}
                        className={`px-6 py-3 ${index > 0 ? 'text-center' : 'text-left'} text-xs font-medium text-gray-500 uppercase tracking-wider`}
                      >
                        {header.isPlaceholder ? null : (
                          <div
                            {...{
                              className: header.column.getCanSort()
                                ? 'cursor-pointer select-none'
                                : '',
                              onClick: header.column.getToggleSortingHandler(),
                            }}
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            {{
                              asc: ' 🔼',
                              desc: ' 🔽',
                            }[header.column.getIsSorted() as string] ?? null}
                          </div>
                        )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {table
                  .getRowModel()
                  .rows.slice(0, 10)
                  .map(row => {
                    return (
                      <tr key={row.id}>
                        {row.getVisibleCells().map((cell, index) => {
                          return (
                            <td key={cell.id}
                              className={`${index > 0 ? 'text-center' : ''} px-6 py-4 text-sm text-gray-900`}
                            >
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </td>
                          )
                        })}
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TableStructure