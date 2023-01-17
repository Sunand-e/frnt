import {
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  ColumnResizeMode,
  ColumnDef
} from '@tanstack/react-table'
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from '../../../utils/router';
import IndeterminateCheckbox from './IndeterminateCheckbox';
import TableActions from './TableActions';
import TableStructure from './TableStructure';

const Table = ({
  tableData,
  tableCols,
  options = {} as any,
  bulkActions = [],
  filters = [],
  typeName ='item',
  typeOptions={},
  showTop=true,
  draggableRows=false,
  // rowSelection = {},
  onRowSelect = (selection) => null,
  onRowClick = null
}) => {

  const [sorting, setSorting] = useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = useState('')
  const [rowSelection, setRowSelection] = useState({})
  const [ categoryId, setCategoryId ] = useState(null)
  const [ contentType, setContentType ] = useState(null)

  const router = useRouter()
  const { type } = router.query

  useEffect(() => {
    setContentType(type)
  },[type])

  const selectable = !!bulkActions.length;

  const handleRowSelectionChange = (selection) => {
    setRowSelection(selection)
  }

  useEffect(() => {
    onRowSelect(table.getSelectedRowModel().flatRows.map(row=>row.original.id))
 
  },[rowSelection])

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

  const memoedData = useMemo(() => {
    let data = tableData;
    
    if(!!contentType && !['group', 'user'].includes(contentType)) {
      data = data.filter(item => item.contentType === contentType);
    }

    if(categoryId) {
      data = data?.filter(item => {
        return item?.tags?.some(tag => tag.id === categoryId)
      })
    }
    return data
  },[tableData, categoryId, contentType])


  const [data, setData] = useState(memoedData);


  const [columnResizeMode, setColumnResizeMode] = useState<ColumnResizeMode>("onChange");

  // const globalFilterFn: FilterFn<T> = (row, columnId, filterValue: string) => {
  const globalFilterFn = (row, columnId, filterValue: string) => {
    const search = filterValue.toLowerCase();
  
    let value = row.getValue(columnId) as string;
    if (typeof value === 'number') value = String(value);
  
    return value?.toLowerCase().includes(search);
  };
  
  const table = useReactTable({
    state: {
      sorting,
      rowSelection,
      globalFilter
    },
    globalFilterFn,
    columns, 
    data,
    onSortingChange: setSorting,
    onRowSelectionChange: handleRowSelectionChange,
 
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    // getPaginationRowModel: getPaginationRowModel(),
    // debugTable: true,
  });
console.log('  table.getState().columnSizing')
console.log(  table.getState().columnSizing)
  return (
    <>
      { showTop && <TableActions { ...{
        table,
        globalFilter,
        setGlobalFilter,
        bulkActions,
        tableData,
        categoryId,
        setCategoryId,
        contentType,
        setContentType,
        filters,
        typeName,
        typeOptions
      }} /> }

      <TableStructure setData={setData} table={table} selectable={selectable} draggableRows={draggableRows} onRowClick={onRowClick} />
    </>
  );
}

export default Table