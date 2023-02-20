import { useMemo } from "react";
import Select from "react-select";
import useGetGroups from "../../../hooks/groups/useGetGroups";

const GroupSelect = ({onSelect, selected='all'}) => {

  const defaultOption = {
    name: 'All groups',
    id: 'all',
  }
  
  // const { user } = useGetCurrentUser()
  const { groups: groupConnection } = useGetGroups()
  const groups = groupConnection?.edges.map(groupEdge => groupEdge.node)
  groups && groups.unshift(defaultOption)
  
  const value = groups?.find(group => group.id === selected) || defaultOption
  const isClearable = value !== defaultOption
  
  const selectProps = useMemo(() => ({
    options: groups,
    getOptionLabel: group => group.name,
    getOptionValue: group => group.id,
    // defaultValue: currentRoles[0],
    value,
    menuPortalTarget: document.body,
    isSearchable: false,
    onChange: onSelect,
    isClearable,
    styles: {
      menuPortal: base => ({ ...base, zIndex: 9999 }),
      control: (provided, state) => ({
        ...provided,
        minWidth: "240px"
      }),
    },
  }), [groups, value, onSelect])

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