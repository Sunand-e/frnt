import Pluralize from 'pluralize'
import Select from 'react-select'
import TagSelect from "../../tags/inputs/TagSelect"
import BulkActionsMenu from "./BulkActionsMenu"
import GlobalFilter from "./GlobalFilter"
import { useTableContext } from './tableContext'
import { Table } from '@tanstack/react-table'
import { useRouter } from '../../../utils/router'
import { contentTypes } from '../contentTypes'
import useTenantFeaturesEnabled from '../../../hooks/users/useTenantFeaturesEnabled'
import useUserHasCapability from '../../../hooks/users/useUserHasCapability'
import BlinkingEllipsis from '../misc/BlinkingEllipsis'
import Button from '../Button'
import { FileExport } from '@styled-icons/fa-solid/FileExport';
import downloadCSV from '../../../utils/downloadCsv'

const TableActions = ({ table }: { table: Table<any> }) => {
  
  const globalFilter = useTableContext(s => s.globalFilter)
  const categoryId = useTableContext(s => s.categoryId)
  const collectionId = useTableContext(s => s.collectionId)
  const itemType = useTableContext(s => s.itemType)
  const setItemType = useTableContext(s => s.setItemType)
  const setCategoryId = useTableContext(s => s.setCategoryId)
  const setCollectionId = useTableContext(s => s.setCollectionId)
  const setGlobalFilter = useTableContext(s => s.setGlobalFilter)
  const count = useTableContext(s => s.count)
  const bulkActions = useTableContext(s => s.bulkActions)
  const contentType = useTableContext(s => s.contentType)
  const filters = useTableContext(s => s.filters)
  const types = useTableContext(s => s.typeOptions)
  const typeName = useTableContext(s => s.typeName)
  const dontShowTypes = useTableContext(s => s.dontShowTypes)
  const isLoading = useTableContext(s => s.isLoading)
  const tableCols = useTableContext(s => s.tableCols)
  const exportFilename = useTableContext(s => s.exportFilename)
  const isExportable = useTableContext(s => s.isExportable)
  
  const { tenantFeaturesEnabled } = useTenantFeaturesEnabled()
  const { userHasCapability } = useUserHasCapability()
  const contentItemTypeOptions = Object.entries(contentTypes).map(([key, value]) => ({
    value: key,
    ...value
  })).filter(type => {
    return type.isAssignable && !dontShowTypes.includes(type.value)
  });

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
  const handleContentTypeChange = (option: any) => {
    router.push({query: {
      ...router.query,
      ctype: option?.value
    }})
  }

  const pluralTypeName = Pluralize( typeName, 2 )
  const visibleCount = table.getFilteredRowModel().rows.length

  const itemCountString = `Showing ${visibleCount}
    ${count && visibleCount !== count ? `of ${count}` : ''}
    ${count === 1 ? typeName : pluralTypeName}
  `

  return (

    <div className='flex items-center flex-col mb-3 sm:justify-between sm:flex-row text-nowrap'>
      <div className='flex items-center flex-col sm:flex-row gap-3 flex-wrap'>
        
        { !!bulkActions.length && <BulkActionsMenu /> }
        
        { filters.includes('global') && <GlobalFilter
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
        /> }
        
        { filters.includes('category') && (
          <TagSelect selected={categoryId} tagType={`category`} onSelect={tag => setCategoryId(tag?.id)} />
        )}

        { filters.includes('collection') && tenantFeaturesEnabled('tags.collections') && userHasCapability('GetCollections') &&  (
          <TagSelect selected={collectionId} tagType={`collection`} onSelect={tag => setCollectionId(tag?.id)} />
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
      <div className="flex items-center flex-col sm:flex-row ">
        <p className='whitespace-nowrap pl-3'>{isLoading ? <>Loading<BlinkingEllipsis /></> : itemCountString}</p>
        <div className='flex space-x-3 ml-5'>
          {isExportable && <Button onClick={() => downloadCSV(exportFilename, tableCols, table)}><>Export to CSV<FileExport className="w-5 ml-2 -mr-1" /></></Button>}
        </div>
      </div>
    </div>
  )
}

export default TableActions