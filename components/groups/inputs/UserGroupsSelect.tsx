import Select, { components, MenuProps } from 'react-select'
import 'react-dropdown-tree-select/dist/styles.css'

import IconOption from "../../common/inputs/react-select/IconOption";
import Button from '../Button';
import { useState } from 'react';
import useGetUser from '../../../hooks/users/useGetUser';
import { useRouter } from '../../../utils/router';
import useGetGroups from '../../../hooks/groups/useGetGroups';

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
    zIndex: 13000,
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
const UserGroupsSelect = ({menuTopMargin=0}) => {

  
  return (
    <>
      <Select
        placeholder={<span className="text-main-secondary">Choose groups...</span>}
        menuIsOpen={open}
        onMenuOpen={() => setOpen(true)}
        onMenuClose={() => setOpen(false)}
        options={availableGroups}
        styles={{
          ...customStyles,              
          menu: (provided, state) => ({
            ...provided,
            marginTop: menuTopMargin,
          }),
        }}
        components={{ Option: IconOption, Input }}
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

export default UserGroupsSelect
