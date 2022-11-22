import Select, { components } from 'react-select'
import { useCallback, useState } from 'react'
import DropdownTreeSelect from 'react-dropdown-tree-select'
import 'react-dropdown-tree-select/dist/styles.css'

import IconOption from "../../common/inputs/react-select/IconOption";

const customStyles = {
  menuPortal: (provided, state) => ({
    ...provided,
    zIndex: 3000,
  }),
  input: (provided, state) => ({
    ...provided,
    boxShadow: 'none',
  })
}

const Input = props => (
  <components.Input 
     {...props} 
     inputClassName="outline-none border-none shadow-none focus:ring-transparent"
  />
)
const CourseSelect = ({options, onSelect}) => {
    
  return (
    <>
    <Select
      placeholder={<span className="text-main-secondary">All courses</span>}
      options={options}
      styles={customStyles}
      components={{ Option: IconOption, Input }}
      onChange={onSelect}
      className={`w-full`}
      isSearchable={true}
      menuPortalTarget={document.body}
    />
    </>
  )
}

export default CourseSelect