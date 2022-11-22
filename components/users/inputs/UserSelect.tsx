import { useEffect, useMemo } from "react";
import Select from "react-select";
import useGetCurrentUser from "../../../hooks/users/useGetCurrentUser";
import useGetUsers from "../../../hooks/users/useGetUsers";

const UserSelect = ({onSelect, selected}) => {

  // const { user } = useGetCurrentUser()
  const { users: userConnection } = useGetUsers()
  const users = userConnection?.edges.map(userEdge => userEdge.node)
  
  const selectProps = useMemo(() => ({
    options: users,
    getOptionLabel: user => user.name,
    getOptionValue: user => user.id,
    // defaultValue: currentRoles[0],
    value: users?.find(user => user.id === selected) || null,
    placeholder: `Select user`,
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
  }), [users, onSelect])

  return (
    <div className="flex space-x-4">
      
      { users && (
        <>
          <Select {...selectProps} />
        </>
      )}
    </div>
  )
}

export default UserSelect