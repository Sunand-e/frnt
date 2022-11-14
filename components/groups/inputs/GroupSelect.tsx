import { useEffect, useMemo } from "react";
import Select from "react-select";
import useGetGroups from "../../../hooks/groups/useGetGroups";
import useGetCurrentUser from "../../../hooks/users/useGetCurrentUser";

const GroupSelect = ({onSelect, selected}) => {

  // const { user } = useGetCurrentUser()
  const { groups: groupConnection } = useGetGroups()
  const groups = groupConnection?.edges.map(groupEdge => groupEdge.node)
  
  const selectProps = useMemo(() => ({
    options: groups,
    getOptionLabel: group => group.name,
    getOptionValue: group => group.name,
    // defaultValue: currentRoles[0],
    value: groups?.find(group => group.id === selected) || null,
    placeholder: `Select group`,
    menuPortalTarget: document.body,
    isSearchable: false,
    onChange: onSelect,
    styles: {
      menuPortal: base => ({ ...base, zIndex: 9999 }),
      control: (provided, state) => ({
        ...provided,
        minWidth: "240px"
      }),
    },
  }), [groups, onSelect])

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