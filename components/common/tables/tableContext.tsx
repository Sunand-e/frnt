import { Column, ColumnDef, SortingState, Table } from "@tanstack/react-table";
import { createStore, useStore } from 'zustand'
import { createContext, createRef, MutableRefObject, ReactNode, useContext, useMemo } from 'react'
import { useRef } from 'react'

export interface TableProps {
  count?: number,
  table?: Table<any>,
  globalFilter?: string,
  bulkActions?: Array<any>,
  tableData: Array<any>,
  tableCols: Array<any>,
  categoryId?: string,
  collectionId?: string,
  contentType?: string,
  itemType?: string,
  filters?: Array<string>,
  typeName?: string,
  exportFilename?: string,
  typeOptions?: any,
  sorting?: SortingState,
  backButton?: ReactNode | null,
  rowSelection?: any,
  rowSizing?: 'sm' | 'md' | 'lg',
  selectedRowIds?: Array<string>,
  showTop?: boolean,
  showHeadersWhenLoading?: boolean,
  scrollContainerRef?: MutableRefObject<HTMLDivElement>
  scrollInTable: boolean,
  maxVisibleRows: number,
  dontShowTypes?: Array<string>,
  isExportable?: boolean,
  isLoading?: boolean,
  isReorderable?: boolean,
  isReorderableActive?: boolean,
  isSelectable?: boolean,
  isReportingTable?: boolean,
  loadingText?: ReactNode,
  getReorderableItemIdFromRow?: (row: any) => string,
  onRowSelect?: (selection: any) => void,
  onRowClick?: () => void,
  onReorder?: (active: any, over: any, newIndex: number, oldIndex: number) => void | null,
  onFilterChange?: (categoryId: string, collectionId: string, globalFilter: string) => void | null,
}

interface TableState extends TableProps {
  setIsLoading: (loading: boolean) => void
  setTable: (table: Table<any>) => void
  setGlobalFilter: (filter: TableProps['globalFilter']) => void
  setBulkActions: (bulkActions: TableProps['bulkActions']) => void
  // setTableData: (tableData: TableProps['tableData']) => void
  setCategoryId: (categoryId: TableProps['categoryId']) => void
  setCollectionId: (collectionId: TableProps['collectionId']) => void
  setContentType: (contentType: TableProps['contentType']) => void
  setItemType: (itemType: TableProps['contentType']) => void
  setFilters: (filters: TableProps['filters']) => void
  setTypeName: (typeName: TableProps['typeName']) => void
  setTypeOptions: (typeOptions: TableProps['typeOptions']) => void
  // setSorting: (sorting: TableProps['sorting']) => SortingState
  setSorting: (updaterFn: TableProps['sorting']) => void
  setRowSelection: (rowSelection: TableProps['rowSelection']) => void
  setRowSizing: (rowSizing: TableProps['rowSizing']) => void
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
    collectionId: null,
    contentType: null,
    itemType: null,
    rowSizing: 'md',
    filters: [],
    typeName: 'item',
    typeOptions: {},
    sorting: null,
    rowSelection: {},
    selectedRowIds: [],
    tableCols: [],
    dontShowTypes: [],
    showTop: true,
    showHeadersWhenLoading: true,
    isReorderable: false,
    isReorderableActive: false,
    isSelectable: false,
    isReportingTable: false,
    scrollInTable: false,
    maxVisibleRows: 5,
    exportFilename: 'export',
    backButton: null,
    onFilterChange: null,
    scrollContainerRef: createRef(),

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
    setRowSizing: rowSizing => set(state => ({rowSizing})),
    setGlobalFilter: globalFilter => set(state => ({globalFilter})),
    setBulkActions: bulkActions => set(state => ({bulkActions})),
    // setTableData: tableData => set(state => ({tableData})),
    setCategoryId: categoryId => set(state => ({categoryId})),
    setCollectionId: collectionId => set(state => ({collectionId})),
    setContentType: contentType => set(state => ({contentType})),
    setItemType: itemType => set(state => ({itemType})),
    setFilters: filters => set(state => ({filters})),
    setTypeName: typeName => set(state => ({typeName})),
    setTypeOptions: typeOptions => set(state => ({typeOptions})),
    setIsLoading: isLoading => set(state => ({isLoading})),
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
    return tableProps
  },[
    tableProps.isReorderable,
    tableProps.tableData
  ])

  const storeRef = useRef<TableStore>()
  if (!storeRef.current) {
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