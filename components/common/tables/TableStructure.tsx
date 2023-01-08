import { flexRender } from "@tanstack/react-table";
import {CaretUp} from "@styled-icons/fa-solid/CaretUp"

interface TableStructureProps {
  table,
  selectable?: boolean
}

const TableStructure = ({table, selectable}: TableStructureProps) => {
  
  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-y-visible sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-y-visible border-b border-gray-200 sm:rounded-lg">
           <table className="min-w-full divide-y divide-gray-200 bg-white">
              <thead className="bg-gray-50">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header, index) => (
                      <th key={header.id} colSpan={header.colSpan}
                        className={`px-6 py-3 text-left h-11 text-xs font-medium max-w-max text-gray-500 uppercase tracking-wider`}
                        style={{
                          textAlign: (index > (selectable ? 1 : 0)) ? 'center' : 'left',
                          ...(header.column.columnDef?.id === 'select' ? { 
                            paddingRight: 0,
                            width: '16px'
                          } : {}),
                        }}
                      > {header.isPlaceholder ? null : (
                          <div className="inline-block">
                            <div
                              {...{
                                className: `${header.column.getCanSort()
                                  ? 'cursor-pointer select-none'
                                  : ''} flex space-x-2 max-w-max items-center justify-center`,
                                onClick: header.column.getToggleSortingHandler(),
                              }}
                            >
                              <div>
                                {flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                              </div>
                              {header.column.getIsSorted() && (
                                <div className="w-4 h-4 flex items-center">
                                  {{
                                    asc: <CaretUp className="w-full" />,
                                    desc: <CaretUp className="rotate-180" />,
                                  }[header.column.getIsSorted()] ?? null}
                                </div>
                              )}
                              {/* {header.column.getCanFilter() ? (
                                <div>
                                  <ColumnFilter column={header.column} table={table} />
                                </div>
                              ) : null} */}
                              
                            </div>
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
                  .rows
                  // .slice(0, 10)
                  .map(row => {
                    return (
                      <tr key={row.original.id}>
                        {row.getVisibleCells().map((cell, index) => {
                          return (
                            <td key={cell.id}
                              className={`${index > (selectable ? 1 : 0) ? 'text-center' : ''} px-6 py-4 text-sm text-gray-900`}
                              style={{
                                ...(cell.column.columnDef?.id === 'select' ? { 
                                  paddingRight: 0,
                                  width: '16px'
                                } : {}),
                              }}
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