import { Column, ColumnDef, SortingState, Table } from "@tanstack/react-table";
import { createStore, useStore } from 'zustand'
import { createContext, ReactNode, useContext, useMemo } from 'react'
import { useRef } from 'react'

export interface TableProps {
  count?: number,
  table?: Table<any>,
  globalFilter?: string,
  bulkActions?: [any?],
  tableData: Array<any>,
  tableCols: Array<any>,
  categoryId?: string,
  contentType?: string,
  itemType?: string,
  filters?: Array<string>,
  typeName?: string,
  exportFilename?: string,
  typeOptions?: any,
  sorting?: SortingState,
  backButton?: ReactNode | null,
  rowSelection?: any,
  selectedRowIds?: Array<string>,
  showTop?: boolean,
  isExportable?: boolean,
  isReorderable?: boolean,
  isReportingTable?: boolean,
  getReorderableItemIdFromRow?: (row: any) => string,
  onRowSelect?: (selection: any) => void,
  onRowClick?: () => void,
  onReorder?: (active: any, over: any, newIndex: number, oldIndex: number) => void | null,
  onFilterChange?: (categoryId: string, globalFilter: string) => void | null,
}

interface TableState extends TableProps {
  setTable: (table: Table<any>) => void
  setGlobalFilter: (filter: TableProps['globalFilter']) => void
  setBulkActions: (bulkActions: TableProps['bulkActions']) => void
  // setTableData: (tableData: TableProps['tableData']) => void
  setCategoryId: (categoryId: TableProps['categoryId']) => void
  setContentType: (contentType: TableProps['contentType']) => void
  setItemType: (itemType: TableProps['contentType']) => void
  setFilters: (filters: TableProps['filters']) => void
  setTypeName: (typeName: TableProps['typeName']) => void
  setTypeOptions: (typeOptions: TableProps['typeOptions']) => void
  // setSorting: (sorting: TableProps['sorting']) => SortingState
  setSorting: (updaterFn: TableProps['sorting']) => void
  setRowSelection: (rowSelection: TableProps['rowSelection']) => void
}

type TableStore = ReturnType<typeof createTableStore>

const createTableStore = (initProps?: Partial<TableProps>) => {

  const DEFAULT_PROPS: TableProps = {
    count: 1,
    table: null,
    globalFilter: null,
    bulkActions: [],
    tableData: [],
    categoryId: null,
    contentType: null,
    itemType: null,
    filters: [],
    typeName: 'item',
    typeOptions: {},
    sorting: null,
    rowSelection: {},
    selectedRowIds: [],
    tableCols: [],
    showTop: true,
    isReorderable: false,
    isReportingTable: false,
    exportFilename: 'export',
    backButton: null,
    onFilterChange: null,
    onRowClick: () => false,
    onRowSelect: (selection) => false,
    onReorder: null,
    getReorderableItemIdFromRow: (row) => row.original.id ?? row.original.node?.id
  }
  return createStore<TableState>()((set) => ({
    ...DEFAULT_PROPS,
    ...initProps,
    setTable: table => set(state => ({table})),
    setRowSelection: rowSelection => set(state => ({rowSelection})),  
    setGlobalFilter: globalFilter => set(state => ({globalFilter})),
    setBulkActions: bulkActions => set(state => ({bulkActions})),
    // setTableData: tableData => set(state => ({tableData})),
    setCategoryId: categoryId => set(state => ({categoryId})),
    setContentType: contentType => set(state => ({contentType})),
    setItemType: itemType => set(state => ({itemType})),
    setFilters: filters => set(state => ({filters})),
    setTypeName: typeName => set(state => ({typeName})),
    setTypeOptions: typeOptions => set(state => ({typeOptions})),
    // setSorting: sorting => set(state => ({sorting})),
    setSorting: sorting => {
      set(state => ({sorting}))
      return sorting
  }
  }))
}

export const TableContext = createContext<TableStore | null>(null)
    
function useTableContext<T>(
  selector: (state: TableState) => T,
  equalityFn?: (left: T, right: T) => boolean
): T {
  const store = useContext(TableContext)
  if (!store) throw new Error('Missing TableContext.Provider in the tree')
  return useStore(store, selector, equalityFn)
}

type TableProviderProps = React.PropsWithChildren<TableProps>

function TableProvider({ children, tableProps }: TableProviderProps) {

  const tableStoreProps = useMemo(() => {
    console.log('chanignigtableprops')
    console.log(tableProps)
    return tableProps
  },[
    tableProps.isReorderable,
    tableProps.tableData
  ])

  const storeRef = useRef<TableStore>()
  if (!storeRef.current) {
    console.log("There's not a current ref to the store")
    storeRef.current = createTableStore(tableStoreProps)
  } else {
    storeRef.current.setState(s => tableStoreProps)
  }
  return (
    <TableContext.Provider value={storeRef.current}>
      {children}
    </TableContext.Provider>
  )
}

export { 
  useTableContext,
  TableProvider
}