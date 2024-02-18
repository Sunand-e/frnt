import Select, { components, MenuProps } from 'react-select'
import 'react-dropdown-tree-select/dist/styles.css'

import IconOption from "../../common/inputs/react-select/IconOption";
import Button from '../Button';
import { useContext, useState } from 'react';
import { TenantContext } from '../../../context/TenantContext';

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
const ContentSelectCategorised = ({availableContent, onChange, typeName, menuTopMargin=0}) => {

  const [open, setOpen] = useState(false);
  
  const tenant = useContext(TenantContext)

  const tags = availableContent.reduce((tagArr, course, index, array) => {
    return [
        ...tagArr,
        ...course.tags.edges.filter(({node}) => !tagArr.some(t => t.id === node.id))
    ]
  }, [])
  
  const CloseMenuButtonMenuComponent = (
    props
  ) => (
    <>
      <div className={`bg-white mt-1 flex flex-col w-full items-end`}>
        <Button size='sm' onClick={() => setOpen(false)}>Close options</Button>
      </div>
      <components.Menu
        {...props}
      >
        {props.children}
      </components.Menu>
    </>
  );

  let uniqueContent = []
  const categorisedContentData = tags.map(tag => {
    return ({
      label: tag.node.label,
      options: availableContent.filter(course => {
        if(
          uniqueContent.some(c => c.id === course.id)
          || !course.tags.edges.some(({node}) => node.id === tag.node.id)
        ) {
          return false
        }
        uniqueContent.push(course)
        return true
      }).map(course => {
        return ({
        label: course.title,
        value: course.id,
        ...((tenant && tenant.limitEnrolments && course.enrolmentsRemaining === 0) ? {
          isDisabled: true,
          style: {
            opacity: 0.5
          }
        } : {})
      })}),
    })
  })

  const selectOptions = [
    ...categorisedContentData,
    {
      label: 'Uncategorised',
      options: availableContent.filter(course => {
        return !uniqueContent.some(c => c.id === course.id) && !course.tags.edges.length
      }).map(course => ({
        label: course.title,
        value: course.id,
      }))  
    }
  ]
  

  return (
    <>
    <Select
      placeholder={<span className="text-main-secondary">Choose {typeName}s...</span>}
      menuIsOpen={open}
      onMenuOpen={() => setOpen(true)}
      onMenuClose={() => setOpen(false)}
      options={selectOptions}
      styles={{
        ...customStyles,              
        menu: (provided, state) => ({
          ...provided,
          marginTop: menuTopMargin,
        }),
      }}
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
