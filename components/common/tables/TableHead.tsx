import { FC, RefObject } from 'react';
import { flexRender } from '@tanstack/react-table';
import classNames from "../../../utils/classNames";
import { CaretUp } from "@styled-icons/fa-solid/CaretUp";

interface TableHeadProps {
  table: any;
  tHeadRef: RefObject<HTMLTableSectionElement>;
  scrollInTable: boolean;
  dataCellOffset: number;
  padding: string;
  colWidths: number[];
}

const TableHead: FC<TableHeadProps> = ({ table, tHeadRef, scrollInTable, dataCellOffset, padding, colWidths }) => {
  return (
    <thead className="bg-gray-50 sticky top-0" ref={tHeadRef} style={{ zIndex: 10000 }}>
      {table.getHeaderGroups().map((headerGroup: any) => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map((header: any, index: any) => {
            if (header.column.columnDef.hideOnTable){
              return (<></>);
            }
            return (
              <th key={header.id} colSpan={header.colSpan}
                className={classNames(
                  "bg-gray-50 pl-4 py-3 text-left h-11 text-xs font-medium max-w-max text-gray-500 uppercase tracking-wider " +
                  "border-b border-gray-200",
                  scrollInTable && 'sticky top-0'
                )}
                style={{
                  textAlign: (index > dataCellOffset) ? 'center' : 'left',
                  zIndex: 10000,
                  padding,
                  ...(headerGroup.headers.length !== index + 1 && { paddingRight: 0 }),
                  ...(colWidths && { width: colWidths[index] }),
                }}
              >
                {header.isPlaceholder ? null : (
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
                          }[header.column.getIsSorted() as 'asc' | 'desc'] ?? null}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </th>
            );
          })}
        </tr>
      ))}
    </thead>
  );
};

export default TableHead;