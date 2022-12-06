import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  ColumnDef,
  getSortedRowModel,
  SortingState,
} from '@tanstack/react-table'
import { useState } from 'react';
import TableStructure from './TableStructure';

const Table = ({
  tableData, 
  tableCols
}) => {

  const [sorting, setSorting] = useState<SortingState>([])

  const table = useReactTable({
    state: {
      sorting,
    },
    columns: tableCols, 
    data: tableData,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });

  // const [parent] = useAutoAnimate()
  
  return (
    <TableStructure table={table} />
  );
}

export default Table