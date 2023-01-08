import Pluralize from 'pluralize'
import Select from 'react-select'
import { useState } from "react"
import TagSelect from "../../tags/inputs/TagSelect"
import BulkActionsMenu from "./BulkActionsMenu"
import GlobalFilter from "./GlobalFilter"

const TableActions = ({
  table,
  tableData, 
  globalFilter,
  setGlobalFilter,
  bulkActions,
  categoryId,
  setCategoryId,
  contentType,
  setContentType,
  typeOptions: types,
  filters,
  typeName='item'
}) => {
  
  const clearFilters = () => {
    setCategoryId(null)
    setGlobalFilter(null)
    setContentType(null)
  }

  const cleared = !categoryId && !globalFilter && !contentType

  const typeOptions = Object.keys(types).map(typeName => {
    return {
      value: typeName,
      label: types[typeName].label
    }
  });

  const pluralTypeName = Pluralize( typeName, 2 )
  const visibleCount = table.getFilteredRowModel().rows.length
  const itemCountString = `Showing ${visibleCount}
    ${visibleCount !== tableData.length ? `of ${tableData.length}` : ''}
    ${tableData.length === 1 ? typeName : pluralTypeName}
  `

  return (

    <div className='flex items-center flex-col mb-3 sm:justify-between sm:flex-row'>
      <div className='flex items-center flex-col sm:flex-row space-x-3'>
        
        { !!bulkActions.length && <BulkActionsMenu {...{bulkActions}} /> }
        
        { filters.includes('global') && <GlobalFilter
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
        /> }
        
        { filters.includes('category') && (
          <TagSelect selected={categoryId} tagType={`category`} onSelect={tag => setCategoryId(tag.id)} />
        )}

        { filters.includes('contentType') && (
        <div className="relative ml-0 w-full mt-5 md:w-auto md:mt-0 sm:mt-0">
          <Select
            name="types"
            className='absolute z-0'
            styles={{
              menu: (base) => ({
                ...base,
                width: "max-content",
                minWidth: "100%"
              }),
            }}
            // defaultValue={category}resourceTypes[typeName].label
            value={contentType && {value: contentType, label: types[contentType].label}}
            onChange={(option) => setContentType(option?.value)}
            placeholder={'Select type...'}
            options={typeOptions}
            instanceId="type"
            classNamePrefix="select"
            isClearable
            isSearchable={false}
          />
        </div> ) }

        { !!filters.length && !cleared && (
          <span className={`text-main-secondary hover:text-main p-1 px-3 cursor-pointer`} onClick={clearFilters}>clear filters</span>
        )}
      </div>
      <p>{!!tableData.length && itemCountString}</p>
    </div>
  )
}
export default TableActions