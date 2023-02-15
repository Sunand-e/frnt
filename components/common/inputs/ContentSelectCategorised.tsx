import Select, { components } from 'react-select'
import 'react-dropdown-tree-select/dist/styles.css'

import IconOption from "../../common/inputs/react-select/IconOption";

const customStyles = {
  option: (provided, state) => {
    return ({
      ...provided,
      padding: 8,
      height: 'auto',
      lineHeight: 1.5
    })
  },
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
const ContentSelectCategorised = ({data, onChange, typeName}) => {
    
  return (
    <>
    <Select
      placeholder={<span className="text-main-secondary">Choose {typeName}s...</span>}
      options={data}
      styles={customStyles}
      components={{ Option: IconOption, Input }}
      onChange={onChange}
      className={`w-full mb-4`}
      isMulti={true}
      isSearchable={true} 
      closeMenuOnSelect={false}
      menuPortalTarget={document.body}
      menuPlacement={'auto'}
    />
    </>
  )
}

export default ContentSelectCategorised
