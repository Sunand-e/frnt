import Select, { components } from 'react-select'
import SearchField from "react-search-field";
import contentTypes from "../contentTypes";

const libraryContentTypes = contentTypes.filter(type => !(type?.notInLibrary === true))

export default function SearchFilter({tags, searchParams, setSearchParams}) {

  const typeOptions = [
    { value: "", label: "All Types" },
    ...libraryContentTypes.map(type => ({
      value: type.slug,
      label: type.pluralName
    }))
  ]

  const tagOptions = [
    { value: "", label: "All Tags" },
    ...tags.map(tag => ({
      value: tag.slug,
      label: tag.name
    }))
  ]

  const onSearchChange = (type, option) => {
    let newParams = { ...searchParams }
    newParams[type] = option
    setSearchParams(newParams);
  }

  const resetFilters = () => {
    setSearchParams({
      text: '',
      type: '',
      tag: '',
    });
  }

  const customSelectStyles = {
    control: (provided, state) => ({
      ...provided,
      padding: "0.5rem 0 0.5rem 1rem",
      borderWidth: "2px",
      borderRadius: "0.375rem",
      borderColor: "rgba(9, 123, 216)"
    }),
    input: (provided, state) => ({
      // none of react-select's styles are passed to <Control />
      // width: 200,
    }),
    singleValue: (provided, state) => ({
      // none of react-select's styles are passed to <Control />
      // width: 200,
    }),
    dropdownIndicator: (provided, state) => ({
      ...provided,
      paddingTop: 0,
      paddingBottom: 0
    }),
    valueContainer: (provided, state) => ({
      ...provided,
      padding: 0,
    }),
  }
  
  return (
    <div className="flex-col py-6 px-8 my-8 mb-16 shadow-lg bg-main-semitransparent">
      <div className="flex items-stretch space-x-16 mb-6">    
        <div className="flex-1 flex flex-col">
          <label className="mb-2 uppercase font-bold text-lg text-main-dark" htmlFor="search">Search</label>
            <div className="relative text-gray-600 focus-within:text-gray-400">
              <span className="absolute inset-y-0 right-4 flex items-center pl-2">
                {/* <button type="submit" class="p-1 focus:outline-none focus:shadow-outline"> */}
                  <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" className="w-6 h-6"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                {/* </button> */}
              </span>
              <input 
                onChange={(e) => onSearchChange('text', e.target.value)}
                value={searchParams.text}
                type="search"
                name="q"
                className="py-2 w-full rounded-md pl-4 border-2 border-blue focus:outline-none focus:bg-white focus:text-gray-900"
                placeholder="Search..."
                autoComplete="off"
              />
            </div>
        </div>

        <div className="flex-1 flex flex-col">
          <label className="mb-2 uppercase font-bold text-lg text-main-dark" htmlFor="last_name">Content Type</label>
          <Select 
            defaultValue={typeOptions[0]}
            onChange={(option) => onSearchChange('type', option)}
            // inputValue={typeOptions[0].value}
            value={searchParams.type || typeOptions[0]}
            options={typeOptions}
            styles={customSelectStyles}
            placeholder={'Select type...'}
            // className="py-2 w-full rounded-md pl-4 border-2 border-blue focus:outline-none focus:bg-white focus:text-gray-900"
            instanceId="type"
            />
          </div>
          
        <div className="flex-1 flex flex-col">
          <label className="mb-2 uppercase font-bold text-lg text-main-dark" htmlFor="last_name">Tags</label>
          <Select
            name="colors"
            // defaultValue={tagOptions[0]}
            value={searchParams?.tag?.value ? searchParams.tag : tagOptions[0]}
            onChange={(option) => onSearchChange('tag', option)}
            placeholder={'Select tag...'}
            options={tagOptions}
            styles={customSelectStyles}
            className="flex-1"
            instanceId="tag"
            classNamePrefix="select"
          />
        </div>
      </div>
      <div className="text-center">
        <button className="border-2 border-blue text-main-dark uppercase p-2 font-semibold" onClick={resetFilters}>
            Clear search filters 
        </button>
      </div>
    </div>
  )
}
