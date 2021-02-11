import Select, { components } from 'react-select'
import SearchField from "react-search-field";
import contentTypes from "../contentTypes";

export default function SearchFilter({tags, searchParams, setSearchParams}) {

  const toTitleCase = (str) => (
     str.replace(
      /\w\S*/g,
      function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    )
  )
  const typeOptions = [
    { value: '', label: 'All Types' },
    ...contentTypes.map(type => ({
      value: type.slug,
      label: toTitleCase(type.name)
    }))
  ]

  const tagOptions = [
    { value: '', label: 'All Tags' },
    ...tags.map(tag => ({
      value: tag.slug,
      label: tag.name
    }))
  ]

  const onSearchChange = (type, value) => {
    let newParams = { ...searchParams }
    newParams[type] = value
    setSearchParams(newParams);
  }

  return (
    <div className="flex items-stretch space-x-8" >            
      <div className="flex-1 flex flex-col mb-4">
        <label className="mb-2 uppercase font-bold text-lg text-grey-darkest" htmlFor="search">Search</label>
        <SearchField
          placeholder="Search..."
          onChange={(value) => onSearchChange('text', value)}
          // searchText="This is initial search text"
          classNames="test-class"
          />
      </div>

      <div className="flex-1 flex flex-col mb-4">
        <label className="mb-2 uppercase font-bold text-lg text-grey-darkest" htmlFor="last_name">Content Types</label>
        <Select 
          defaultValue={typeOptions[0]}
          onChange={(option) => onSearchChange('type', option.value)}
          options={typeOptions}
          placeholder={'Select type...'}
          className="flex-1"
          instanceId="type"
          />
        </div>
        
      <div className="flex-1 flex flex-col mb-4">
        <label className="mb-2 uppercase font-bold text-lg text-grey-darkest" htmlFor="last_name">Tags</label>
        <Select
          name="colors"
          defaultValue={tagOptions[0]}
          onChange={(option) => onSearchChange('tag', option.value)}
          placeholder={'Select tag...'}
          options={tagOptions}
          className="flex-1"
          instanceId="tag"
          classNamePrefix="select"
        />
      </div>
    </div>
  )
}
