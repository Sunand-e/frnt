import { useEffect } from 'react';
import Select from 'react-select'
import useGetTags from '../../hooks/tags/useGetTags';
import { useRouter } from '../../utils/router';
import { libraryItemTypes } from '../library/libraryItemTypes';

export default function ContentLibraryFilters({hasSearch=true, hasCategories=true, hasType=true}) {
  
  const router = useRouter()
  const { search, type, category } = router.query

  const { tags } = useGetTags()

  const onFilterChange = (filterType, option) => {
    router.push({query: {
      ...router.query,
      [filterType]: option
    }})
    // setFilters(newFilters);
  }

  const tagOptions = tags ? [
    ...tags.map(tag => ({
      value: tag.label,
      label: tag.label
    }))
  ]: []

  const typeOptions = Object.keys(libraryItemTypes).map(typeName => {
    return {
      value: typeName,
      label: libraryItemTypes[typeName].label
    }
  });

  return (
    <div>
      <div className="flex items-center space-x-4 mb-6 z-10 relative">    
        <div className="relative text-gray-600 focus-within:text-gray-400">
          <span className="absolute inset-y-0 left-3 flex items-center ">
            {/* <button type="submit" class="p-1 focus:outline-none focus:shadow-outline"> */}
              <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" className="w-6 h-6"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            {/* </button> */}
          </span>

          <input 
            onChange={(e) => onFilterChange('search', e.target.value)}
            value={search || null}
            type="search"
            name="q"
            className="
            block
            pl-10
            rounded-md
            border-main/50
            shadow-sm
            focus:border-main focus:ring focus:ring-main/50"
            placeholder="Search..."
            autoComplete="off"
          />
        </div>
        <div className="relative">
          <Select
            name="colors"
            className='absolute z-10'
            styles={{
              menu: (base) => ({
                ...base,
                width: "max-content",
                minWidth: "100%"
              }),
            }}
            // defaultValue={category}
            value={category && {value: category, label: category}}
            onChange={(option) => onFilterChange('category', option?.label)}
            placeholder={'Select category...'}
            options={tagOptions}
            instanceId="category"
            classNamePrefix="select"
            isClearable
            isSearchable={false}
          />
        </div>
        <div className="relative">
          <Select
            name="colors"
            className='absolute z-10'
            styles={{
              menu: (base) => ({
                ...base,
                width: "max-content",
                minWidth: "100%"
              }),
            }}
            // defaultValue={category}
            value={type && {value: type, label: type}}
            onChange={(option) => onFilterChange('type', option?.label)}
            placeholder={'Select type...'}
            options={typeOptions}
            instanceId="type"
            classNamePrefix="select"
            isClearable
            isSearchable={false}
          />
        </div>
        {/* <button className="text-main-dark uppercase p-2 font-semibold" onClick={resetFilters}>
            Clear filters 
        </button> */}
      </div>
    </div>
  )
}
