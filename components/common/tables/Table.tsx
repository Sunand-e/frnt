import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  Column,
  getFilteredRowModel,
  getPaginationRowModel,
  ColumnDef,
  getSortedRowModel,
  SortingState,
} from '@tanstack/react-table'
import { useState } from 'react';
import BulkActionsMenu from './BulkActionsMenu';
import GlobalFilter from './GlobalFilter';
import IndeterminateCheckbox from './IndeterminateCheckbox';
import TableStructure from './TableStructure';

const Table = ({
  tableData,
  tableCols,
  options = {} as any,
  bulkActions = [],
  rowSelection = {},
  onRowSelectionChange = () => null,
}) => {

  const [sorting, setSorting] = useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = useState('')

  const selectable = !!bulkActions.length;

  const columns = [
    ...(selectable ? [{
      id: 'select',
      header: ({ table }) => (
        <IndeterminateCheckbox
          {...{
            checked: table.getIsAllRowsSelected(),
            indeterminate: table.getIsSomeRowsSelected(),
            onChange: table.getToggleAllRowsSelectedHandler(),
          }}
        />
      ),
      cell: ({ row }) => (
        // <div className="px-1">
          <IndeterminateCheckbox
            {...{
              checked: row.getIsSelected(),
              indeterminate: row.getIsSomeSelected(),
              onChange: row.getToggleSelectedHandler(),
            }}
          />
        // </div>
      ),
    }] : []),

    ...tableCols

  ]

  const table = useReactTable({
    state: {
      sorting,
      rowSelection
    },
    columns, 
    data: tableData,
    onSortingChange: setSorting,
    onRowSelectionChange,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true,
  });

  return (
    <>
      {/* <GlobalFilter
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      /> */}
      <div className='mb-2'>
        { !!bulkActions.length && <BulkActionsMenu {...{bulkActions}} /> }
      </div>
      {/* <button
        className="border rounded p-2 mb-2"
        onClick={() => console.info('rowSelection', rowSelection)}
      >
        Log `rowSelection` state
      </button>
      <button
        className="border rounded p-2 mb-2"
        onClick={() =>
          console.info(
            'table.getSelectedFlatRows()',
            table.getSelectedRowModel().flatRows
          )
        }
      >
        Log table.getSelectedFlatRows()
      </button> */}

      <TableStructure table={table} selectable={selectable} />
    </>
  );
}

export default Table