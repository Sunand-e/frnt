import Select from 'react-select'
import useGetTags from '../../hooks/tags/useGetTags';
import { useRouter } from '../../utils/router';

export default function CategoryFilters() {
  
  const router = useRouter()
  const { search, category } = router.query

  const { tags } = useGetTags()

  const onFilterChange = (type, option) => {
    router.push({query: {
      ...router.query,
      [type]: option
    }})
  }

  const tagOptions = tags ? [
    ...tags.filter(t => t.contentItems.totalCount > 0).map(tag => ({
      value: tag.label,
      label: tag.label,
      id: tag.id
    }))
  ]: []

  return (
    <div>
      <div className="flex items-center space-y-4 mb-6 z-10 relative flex-col sm:flex-row sm:space-x-4 sm:space-y-0">
        <div className="relative text-gray-600 focus-within:text-gray-400">
          <span className="absolute inset-y-0 left-3 flex items-center ">
            {/* <button type="submit" class="p-1 focus:outline-none focus:shadow-outline"> */}
              <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" className="w-6 h-6"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            {/* </button> */}
          </span>

          <input 
            onChange={(e) => onFilterChange('search', e.target.value)}
            value={search || ''}
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
            value={tagOptions.find(tag => tag.id === category) || null}
            onChange={(option) => onFilterChange('category', option?.id)}
            placeholder={'Select category...'}
            options={tagOptions}
            instanceId="category"
            classNamePrefix="select"
            isClearable
            isSearchable={false}
          />
        </div>
        {/* <button className="text-main-secondary uppercase p-2 font-semibold" onClick={resetFilters}>
            Clear filters 
        </button> */}
      </div>
    </div>
  )
}
