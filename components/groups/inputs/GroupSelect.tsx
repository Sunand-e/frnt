import { useMemo } from "react";
import Select from "react-select";
import useGetGroups from "../../../hooks/groups/useGetGroups";

const allGroupsOption = {
  name: 'All groups',
  id: 'all',
}

const GroupSelect = ({
  onSelect, 
  defaultOption=allGroupsOption, 
  selected='all', 
  className='',
  groupFilter=null,
  isMulti=false
}) => {
  
  const { groups } = useGetGroups()
  let groupEdges = groups?.edges || []

  if(groupFilter) {
    groupEdges = groupEdges.filter(groupFilter)
  }

  const groupOptions = groupEdges.map(groupEdge => groupEdge.node)

  groupOptions && defaultOption && groupOptions.unshift(defaultOption)
  
  const value = groupOptions?.find(group => group.id === selected) || defaultOption
  const isClearable = value !== defaultOption
  
  const selectProps = useMemo(() => ({
    options: groupOptions,
    getOptionLabel: group => group.name,
    getOptionValue: group => group.id,
    // defaultValue: currentRoles[0],
    value,
    menuPortalTarget: document.body,
    isSearchable: false,
    onChange: onSelect,
    isClearable,
    isMulti,
    className,
    styles: {
      menuPortal: base => ({ ...base, zIndex: 9999 }),
      control: (provided, state) => ({
        ...provided,
        minWidth: "240px"
      }),
    },
  }), [groupOptions, value, onSelect])

  return (
    <div className="flex space-x-4">
      
      { groups && (
        <>
          <Select {...selectProps} />
        </>
      )}
    </div>
  )
}

export default GroupSelect