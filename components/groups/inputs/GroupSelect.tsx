import { useMemo } from "react";
import Select from "react-select";
import useGetGroups from "../../../hooks/groups/useGetGroups";

const GroupSelect = ({
  onSelect,
  className='',
  groupFilter=null,
  isMulti=false,
  isClearable=true,
  defaultValueId=null,
  placeholder="Select group...",
  disable=false
}) => {
  
  const { groups } = useGetGroups()
  let groupEdges = groups?.edges || []

  if(groupFilter) {
    groupEdges = groupEdges.filter(groupFilter)
  }

  const groupOptions = groupEdges.map(groupEdge => groupEdge.node)
  const defaultValue = defaultValueId === 'all' ? null : groupOptions.find(group => group.id === defaultValueId) || null

  const selectProps = useMemo(() => ({
    options: groupOptions,
    getOptionLabel: group => group.name,
    getOptionValue: group => group.id,
    
    menuPortalTarget: document.body,
    isSearchable: false,
    onChange: onSelect,
    isClearable: isClearable,
    isDisabled: disable,
    isMulti,
    className,
    defaultValue,
    styles: {
      menuPortal: base => ({ ...base, zIndex: 9999 }),
      control: (provided, state) => ({
        ...provided,
        minWidth: "240px"
      }),
    },
    placeholder
  }), [groupOptions, onSelect])

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