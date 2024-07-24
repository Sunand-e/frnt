import Pluralize from 'pluralize'
import Select from 'react-select'
import { useEffect, useState } from "react"
import TagSelect from "../../tags/inputs/TagSelect"
import BulkActionsMenu from "./BulkActionsMenu"
import GlobalFilter from "./GlobalFilter"
import { useTableContext } from './tableContext'
import { Table } from '@tanstack/react-table'
import { useRouter } from '../../../utils/router'
import { contentTypes } from '../contentTypes'

const TableActions = ({ table }: { table: Table<any> }) => {
  
  const globalFilter = useTableContext(s => s.globalFilter)
  const categoryId = useTableContext(s => s.categoryId)
  const collectionId = useTableContext(s => s.collectionId)
  const itemType = useTableContext(s => s.itemType)
  const setItemType = useTableContext(s => s.setItemType)
  const setCategoryId = useTableContext(s => s.setCategoryId)
  const setCollectionId = useTableContext(s => s.setCollectionId)
  const setGlobalFilter = useTableContext(s => s.setGlobalFilter)
  const tableData = useTableContext(s => s.tableData)
  const bulkActions = useTableContext(s => s.bulkActions)
  const contentType = useTableContext(s => s.contentType)
  const filters = useTableContext(s => s.filters)
  const types = useTableContext(s => s.typeOptions)
  const typeName = useTableContext(s => s.typeName)
  
  const contentItemTypeOptions = Object.entries(contentTypes).map(([key, value]) => ({
    value: key,
    ...value
  })).filter(type => type.isAssignable);

  const setContentType = useTableContext(s => s.setContentType)

  const clearFilters = () => {
    setCategoryId(null)
    setCollectionId(null)
    setGlobalFilter(null)
    setContentType(null)
    setItemType(null)
  }

  const cleared = !categoryId && !collectionId && !globalFilter && !contentType && !itemType

  const typeOptions = Object.keys(types).map(typeName => {
    return {
      value: typeName,
      label: types[typeName].label
    }
  });

  const router = useRouter()
  const handleContentTypeChange = (option) => {
    // (option) => setContentType(option?.value)
    router.push({query: {
      ...router.query,
      ctype: option?.value
    }})
  }

  const pluralTypeName = Pluralize( typeName, 2 )
  const visibleCount = table.getFilteredRowModel().rows.length
  const itemCountString = `Showing ${visibleCount}
    ${visibleCount !== tableData.length ? `of ${tableData.length}` : ''}
    ${tableData.length === 1 ? typeName : pluralTypeName}
  `

  return (

    <div className='flex items-center flex-col mb-3 sm:justify-between sm:flex-row text-nowrap'>
      <div className='flex items-center flex-col sm:flex-row gap-3 flex-wrap'>
        
        { !!bulkActions.length && <BulkActionsMenu {...{bulkActions}} /> }
        
        { filters.includes('global') && <GlobalFilter
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
        /> }
        
        { filters.includes('category') && (
          <TagSelect selected={categoryId} tagType={`category`} onSelect={tag => setCategoryId(tag.id)} />
        )}

        { filters.includes('collection') && (
          <TagSelect selected={collectionId} tagType={`collection`} onSelect={tag => setCollectionId(tag.id)} />
        )}

        { filters.includes('contentType') && (
          <div className="relative ml-0 w-full mt-5 md:w-auto md:mt-0 sm:mt-0">
            <Select
              name="types"
              className='absolute'
              styles={{
                menu: (base) => ({
                  ...base,
                  width: "max-content",
                  minWidth: "100%"
                }),
                menuPortal: (provided, state) => ({
                  ...provided,
                  zIndex: 13000,
                }),
              }}
              // defaultValue={category}resourceTypes[typeName].label
              value={contentType && {value: contentType, label: types[contentType].label}}
              menuPortalTarget={document.body}
              onChange={handleContentTypeChange}
              placeholder={'Select type...'}
              options={typeOptions}
              instanceId="type"
              classNamePrefix="select"
              isClearable
              isSearchable={false}
            />
          </div>
        ) }

        { filters.includes('itemType') && (
          <div className="relative ml-0 w-full mt-5 md:w-auto md:mt-0 sm:mt-0">
            <Select
              name="types"
              className='absolute'
              styles={{
                menu: (base) => ({
                  ...base,
                  width: "max-content",
                  minWidth: "100%"
                }),
                menuPortal: (provided, state) => ({
                  ...provided,
                  zIndex: 13000,
                }),
              }}
              // defaultValue={category}resourceTypes[typeName].label
              value={itemType && {value: itemType, label: contentTypes[itemType].label}}
              menuPortalTarget={document.body}
              onChange={itemTypeObj => setItemType(itemTypeObj?.value)}
              placeholder={'Select type...'}
              options={contentItemTypeOptions}
              instanceId="type"
              classNamePrefix="select"
              isClearable
              isSearchable={false}
            />
          </div>
        ) }

        { !!filters.length && !cleared && (
          <span className={`text-main-secondary whitespace-nowrap hover:text-main p-1 px-3 cursor-pointer`} onClick={clearFilters}>clear filters</span>
        )}
      </div>
      <p className='whitespace-nowrap pl-3'>{!!tableData.length && itemCountString}</p>
    </div>
  )
}

export default TableActions