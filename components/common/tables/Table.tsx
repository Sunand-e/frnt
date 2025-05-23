import { FileExport } from '@styled-icons/fa-solid/FileExport';
import {
  getCoreRowModel, getFilteredRowModel,
  getSortedRowModel, Table as TableType, useReactTable
} from '@tanstack/react-table';
import Tippy from '@tippyjs/react';
import { ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { useRouter } from '../../../utils/router';
import ReportFilters from '../../reporting/ReportFilters';
import Button from '../Button';
import { DragHandle } from './DragHandle';
import IndeterminateCheckbox from './IndeterminateCheckbox';
import TableActions from './TableActions';
import { TableContext, TableProps, TableProvider, useTableContext } from './tableContext';
import TableStructure from './TableStructure';
import downloadCSV from '../../../utils/downloadCsv';

export const tableSizingOptions = {
  sm: { verticalPadding: '0.5rem', rowHeight: 50 },
  md: { verticalPadding: '1rem', rowHeight: 75 },
  lg: { verticalPadding: '1.5rem', rowHeight: 100 },
};

const TableWithProvider = (props: TableProps) => {
  return (
    <TableProvider {...props}>
      <Table />
    </TableProvider>
  )
}

const Table = () => {

  const store = useContext(TableContext)

  const exportFilename = useTableContext(s => s.exportFilename)
  const globalFilter = useTableContext(s => s.globalFilter)
  const categoryId = useTableContext(s => s.categoryId)
  const collectionId = useTableContext(s => s.collectionId)
  const sorting = useTableContext(s => s.sorting)
  const tableCols = useTableContext(s => s.tableCols)
  const tableData = useTableContext(s => s.tableData)
  const showTop = useTableContext(s => s.showTop)
  const bulkActions = useTableContext(s => s.bulkActions)
  const rowSelection = useTableContext(s => s.rowSelection)
  const itemType = useTableContext(s => s.itemType)
  const contentType = useTableContext(s => s.contentType)
  const setContentType = useTableContext(s => s.setContentType)
  
  const remote = useTableContext(s => s.remote)
  const reLoad = useTableContext(s => s.reLoad)
  const filters = useTableContext(s => s.filters)
  const isReorderable = useTableContext(s => s.isReorderable)
  const isReorderableActive = useTableContext(s => s.isReorderableActive)
  const isSelectable = useTableContext(s => s.isSelectable)
  const isReportingTable = useTableContext(s => s.isReportingTable)
  const backButton = useTableContext(s => s.backButton)
  const onRowSelect = useTableContext(s => s.onRowSelect)
  const isExportable = useTableContext(s => s.isExportable)
  const selectable = isSelectable || !!bulkActions.length
  
  const [tableReorderStatus, setTableReorderStatus] = useState<ReactNode>(null)

  const router = useRouter()
  const { ctype } = router.query

  useEffect(() => {
    setContentType(ctype as string)
  },[ctype])


  const handleRowSelectionChange = (updater: any) => store.setState(state => ({
    rowSelection: typeof updater === 'function' ? updater(state.rowSelection) : updater,
  }))

  useEffect(() => {
    const newRowSelection = table.getSelectedRowModel().flatRows.map(row=>row.original.id || row.original.node?.id)
    store.setState(state => ({
      selectedRowIds: newRowSelection
    }))
    onRowSelect(newRowSelection)
  },[rowSelection])

  const columns = [
    ...(isReorderable ? [{
      id: 'dragHandle',
      header: ({ table }) => {
        return  (
          <DragHandle />
        )
      },
      cell: ({ row }) => {
        if(isReorderableActive) {
          return <DragHandle className={'text-main-secondary'} />
        } else {
          return (
            <Tippy
              className="bg-white text-main p-3 w-60"
              appendTo={document.body}
              // placement='top'
              theme="memberhub-white"
              content={
                <>
                  <p><strong>Reordering items disabled:</strong></p>
                  <p>The table is being {tableReorderStatus}.</p>
                </>
              }
            >
              <div><DragHandle svgClass="opacity-50" /></div>
            </Tippy>
          )
        }
      },
      style: {
        paddingRight: 0,
        width: '36px',
        opacity: isReorderableActive ? 1 : 0.5
      }
    }] : []),
    ...(selectable ? [{
      id: 'select',
      header: ({ table }) => {
        return  (
          <IndeterminateCheckbox
            {...{
              checked: table.getIsAllRowsSelected(),
              indeterminate: table.getIsSomeRowsSelected(),
              onChange: table.getToggleAllRowsSelectedHandler(),
            }}
          />
        )
      },
      cell: ({ row }) => (
        <IndeterminateCheckbox
          {...{
            checked: row.getIsSelected(),
            indeterminate: row.getIsSomeSelected(),
            onChange: row.getToggleSelectedHandler(),
            disabled: row.original.checkboxDisabled
          }}
        />
      ),
      style: {
        paddingRight: 0,
        width: '2rem',
        zIndex: 10001
      },
    }] : []),

    ...tableCols

  ]

  const memoedData = useMemo(() => {
    let data = tableData;
    
    if (remote) {
      return tableData;
    }
    else{
      if(!!itemType && !['group', 'user'].includes(itemType)) {
        data = data.filter(item => (
          item.itemType === itemType
          || item.node?.itemType === itemType
        ))
      }
      
      if(contentType) {
        data = data.filter(item => (
          item.contentType === contentType
          || item.node?.contentType === contentType
        ))
      }
  
      if(categoryId) {
        data = data?.filter(item => {
          return item?.tags?.edges.some(({node}) => node.id === categoryId)
        })
      }
  
      if(collectionId) {
        data = data?.filter(item => {
          return item?.tags?.edges.some(({node}) => node.id === collectionId)
        })
      }
      return data;
    }
  },[tableData, categoryId, collectionId, itemType, contentType, remote])

  const globalFilterFn = (row: any, columnId: string, filterValue: string) => {
    if (remote) {
      return true;
    }else{
      const search = filterValue.toLowerCase();
    
      let value = row.getValue(columnId) as string;
      if (typeof value === 'number') value = String(value);
    
      return value?.toLowerCase().includes(search);
    }
  };

  const table: TableType<any> = useReactTable({
    initialState: {
      columnVisibility: {order: false},
    },
    state: {
      sorting,
      rowSelection,
      globalFilter
    },
    globalFilterFn,
    columns,
    data: memoedData,
    onSortingChange: updater => store.setState(prevState => ({
      sorting: typeof updater === 'function' ? updater(prevState.sorting) : updater
    })),
    onRowSelectionChange: handleRowSelectionChange,
 
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: remote ? undefined : getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    enableRowSelection: (row) => !row.original.checkboxDisabled
  });


  useEffect(() => {
    if(sorting?.length) {
      const orderField = table.getColumn(sorting[0].id).columnDef.sortField;
      const orderDirection = sorting[0].desc ? 'desc' : 'asc';
      remote && reLoad && reLoad({categoryId, collectionId, globalFilter, orderField, orderDirection});
    } else {
      remote && reLoad && reLoad({categoryId, collectionId, globalFilter});
    }
    
    if(isReorderable) {
      if(globalFilter || categoryId || collectionId || sorting?.length) {
        store.setState(state => ({ isReorderableActive: false }))
        if(sorting?.length) {
          const sortingColumnHeading = table.getColumn(sorting[0].id).columnDef.header.toLowerCase()
          setTableReorderStatus(<span>
            sorted by the <strong>{sortingColumnHeading}</strong> column
          </span>)
        }
        if(categoryId) {
          setTableReorderStatus("filtered by category. Please clear filters")
        }
        if(collectionId) {
          setTableReorderStatus("filtered by collection. Please clear filters")
        }
        if(globalFilter) {
          setTableReorderStatus(`filtered by a custom search. Please clear filters`)
        }
      } else {
        store.setState(state => ({ isReorderableActive: true }))
      }
    }
  },[categoryId, collectionId, globalFilter, sorting, isReorderable])

  return (
    <>
      { showTop && <TableActions { ...{
        table,
      }} /> }
      { isReportingTable && (
        <div className="flex items-center flex-col mb-3 sm:flex-row justify-between sm:flex-row text-nowrap">
          <ReportFilters filters={filters} />
          <div className='flex space-x-3'>
            {!!backButton && backButton}
            { isExportable && <Button onClick={() => downloadCSV(exportFilename, tableCols, table)}><>Export to CSV<FileExport className="w-5 ml-2 -mr-1" /></></Button>}
          </div>
        </div>
      )}

      <TableStructure table={table} />
    </>
  );
}

export { Table as TableWithoutProvider };
export default TableWithProvider;